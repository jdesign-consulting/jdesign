(function () {
  "use strict";

  document.documentElement.classList.add("js");

  // Footer year
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  // Header border once scrolled
  var header = document.querySelector("[data-header]");
  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el, i) {
      // Small stagger for items that share a parent grid
      var siblings = el.parentElement ? el.parentElement.querySelectorAll(":scope > .reveal") : [];
      var index = Array.prototype.indexOf.call(siblings, el);
      if (index > 0) el.style.transitionDelay = Math.min(index * 70, 350) + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Contact form (Formspree, submitted with fetch so visitors stay on the page)
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var status = form.querySelector("[data-form-status]");
    var button = form.querySelector("button[type=submit]");

    var setStatus = function (text, type) {
      status.textContent = text;
      status.className = "form-status" + (type ? " is-" + type : "");
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var firstInvalid = null;
      form.querySelectorAll("[required]").forEach(function (field) {
        var ok = field.checkValidity();
        field.setAttribute("aria-invalid", ok ? "false" : "true");
        if (!ok && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        setStatus("Please fill in your name, a valid email and a short message.", "error");
        firstInvalid.focus();
        return;
      }

      if (form.action.indexOf("YOUR_FORM_ID") !== -1) {
        setStatus("The enquiry form isn't connected yet. Please check back soon.", "error");
        return;
      }

      button.disabled = true;
      setStatus("Sending…");

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          form.reset();
          setStatus("Thanks! Your enquiry is on its way. I'll be in touch soon.", "success");
        })
        .catch(function () {
          setStatus("Sorry, something went wrong. Please try again in a moment.", "error");
        })
        .finally(function () {
          button.disabled = false;
        });
    });
  }
})();
