// Store original pixel positions (from image reference)
const originalPositions = {
  skills: { top: 595, left: 395 },
  projects: { top: 530, left: 590 },
  contact: { top: 725, left: 600 },
  goals: { top: 765, left: 635 },
  "about-me": { top: 235, left: 645},
  achievements: { top: 345, left: 348 },
}

// Reference image dimensions
const referenceWidth = 1000
const referenceHeight = 1000

function updateHotspotPositions() {
  const bgImage = document.querySelector(".bg")
  const roomContainer = document.querySelector(".room-container")

  if (!bgImage || !roomContainer) return

  // Get actual image dimensions
  const imageRect = bgImage.getBoundingClientRect()
  const containerRect = roomContainer.getBoundingClientRect()

  // Calculate scale factors based on actual image size
  const scaleX = imageRect.width / referenceWidth
  const scaleY = imageRect.height / referenceHeight

  // Calculate container offset for centered images
  const offsetX = imageRect.left
  const offsetY = imageRect.top

  // Update each hotspot position
  Object.keys(originalPositions).forEach((id) => {
    const hotspot = document.getElementById(id)
    if (!hotspot) return

    const originalPos = originalPositions[id]
    const newLeft = originalPos.left * scaleX + offsetX
    const newTop = originalPos.top * scaleY + offsetY

    hotspot.style.left = newLeft + "px"
    hotspot.style.top = newTop + "px"
    hotspot.style.transform = "translate(-50%, -50%)"
  })
}

// Update positions on page load
window.addEventListener("load", updateHotspotPositions)

// Update positions on window resize
window.addEventListener("resize", updateHotspotPositions)

// Update positions when image loads
const bgImage = document.querySelector(".bg")
if (bgImage) {
  bgImage.addEventListener("load", updateHotspotPositions)
}

// Initial update
updateHotspotPositions()

// Modal mapping
const modalMap = {
  skills: "modal-skills",
  projects: "modal-projects",
  contact: "modal-contact",
  goals: "modal-goals",
  "about-me": "modal-about-me",
  achievements: "modal-achievements",
}

const overlay = document.getElementById("modal-overlay")

// Open modal on hotspot click
Object.keys(modalMap).forEach((hotspotId) => {
  const hotspot = document.getElementById(hotspotId)
  const modalId = modalMap[hotspotId]
  const modal = document.getElementById(modalId)
  const closeBtn = modal.querySelector(".close-btn")

  // Open modal
  hotspot.addEventListener("click", () => {
    modal.classList.add("show")
    overlay.classList.add("show")
  })

  // Close modal with button
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show")
    overlay.classList.remove("show")
  })

  // Close modal when clicking overlay
  overlay.addEventListener("click", () => {
    modal.classList.remove("show")
    overlay.classList.remove("show")
  })

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      modal.classList.remove("show")
      overlay.classList.remove("show")
    }
  })
})
