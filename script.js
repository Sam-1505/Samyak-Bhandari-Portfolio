const header = document.querySelector("[data-header]");
const tabs = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll("[data-panel]");
const timelineItems = document.querySelectorAll(".timeline-item");
const filters = document.querySelectorAll("[data-filter]");
const skills = document.querySelectorAll("[data-skill]");

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selected = tab.dataset.tab;

    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.panel === selected);
    });
  });
});

timelineItems.forEach((item) => {
  const trigger = item.querySelector(".timeline-trigger");

  trigger.addEventListener("click", () => {
    const willOpen = !item.classList.contains("is-open");

    timelineItems.forEach((entry) => {
      entry.classList.remove("is-open");
      entry.querySelector(".timeline-trigger").setAttribute("aria-expanded", "false");
    });

    item.classList.toggle("is-open", willOpen);
    trigger.setAttribute("aria-expanded", String(willOpen));
  });
});

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const selected = filter.dataset.filter;

    filters.forEach((item) => item.classList.toggle("is-active", item === filter));
    skills.forEach((skill) => {
      const shouldDim = selected !== "all" && skill.dataset.skill !== selected;
      skill.classList.toggle("is-hidden", shouldDim);
    });
  });
});
