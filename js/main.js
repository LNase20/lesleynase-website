(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Highlight current page in nav
  var currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    var linkPath = link.getAttribute("href");
    if (linkPath === currentPath) {
      link.setAttribute("aria-current", "page");
    }
  });

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Contact form validation
  var form = document.getElementById("contact-form");
  if (form) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var showNotice = function (type, message) {
      var successNotice = document.getElementById("form-success");
      var errorNotice = document.getElementById("form-error");
      [successNotice, errorNotice].forEach(function (el) {
        if (el) el.classList.remove("is-visible");
      });
      var notice = type === "success" ? successNotice : errorNotice;
      if (notice) {
        notice.textContent = message;
        notice.classList.add("is-visible");
        notice.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    var setFieldError = function (field, message) {
      var wrapper = field.closest(".field");
      if (!wrapper) return;
      var errorEl = wrapper.querySelector(".field-error");
      if (message) {
        wrapper.classList.add("has-error");
        if (errorEl) errorEl.textContent = message;
      } else {
        wrapper.classList.remove("has-error");
        if (errorEl) errorEl.textContent = "";
      }
    };

    var validateForm = function () {
      var valid = true;

      form.querySelectorAll("[required]").forEach(function (field) {
        if (!field.value.trim()) {
          setFieldError(field, "This field is required.");
          valid = false;
        } else {
          setFieldError(field, "");
        }
      });

      var emailField = form.querySelector('[name="email"]');
      if (emailField && emailField.value.trim() && !emailPattern.test(emailField.value.trim())) {
        setFieldError(emailField, "Please enter a valid email address.");
        valid = false;
      }

      return valid;
    };

    form.addEventListener("submit", function (event) {
      if (!validateForm()) {
        event.preventDefault();
        showNotice("error", "Please fix the highlighted fields and try again.");
      }
    });

    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("blur", function () {
        if (field.hasAttribute("required") && !field.value.trim()) {
          setFieldError(field, "This field is required.");
        } else if (field.name === "email" && field.value.trim() && !emailPattern.test(field.value.trim())) {
          setFieldError(field, "Please enter a valid email address.");
        } else {
          setFieldError(field, "");
        }
      });
    });

    // Show success/error banner if redirected back from contact-handler.php
    var params = new URLSearchParams(window.location.search);
    if (params.get("success") === "1") {
      showNotice("success", "Thanks for reaching out! We'll get back to you within 1-2 business days.");
      form.reset();
    } else if (params.get("error") === "1") {
      showNotice("error", "Something went wrong sending your message. Please try again or email us directly.");
    }
  }
})();
