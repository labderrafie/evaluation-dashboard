// dashboard.js

// Configuration object – update the paths as needed.
const config = {
    // URL to the detections.json file (change to your actual location)
    dataUrl: 'data/th_0.1/detections.json',
    // Base path for images (so the img src becomes this base path plus the image name)
    imageBasePath: 'data/th_0.1/'
  };
  
  function loadDashboardData() {
    fetch(config.dataUrl)
      .then(response => response.json())
      .then(data => {
        // Display overall number of processed images
        const metricsDiv = document.getElementById('metrics');
        metricsDiv.innerHTML = `<h3>Processed Images: ${Object.keys(data).length}</h3>`;
  
        const thresholdsDiv = document.getElementById('thresholds');
  
        // Assuming that the JSON keys are image names
        for (const imageName in data) {
          const detections = data[imageName];
  
          // Create a card element for each image
          const card = document.createElement('div');
          card.className = 'card threshold-card';
          card.innerHTML = `
            <div class="card-header">
              <h5>${imageName}</h5>
            </div>
            <div class="card-body">
              <p>Detections:</p>
              <ul id="list-${imageName}"></ul>
              <img src="${config.imageBasePath}${imageName}" alt="${imageName}">
            </div>
          `;
          thresholdsDiv.appendChild(card);
  
          // Populate the detection list
          const listEl = document.getElementById(`list-${imageName}`);
          detections.forEach(det => {
            const li = document.createElement('li');
            li.textContent = `Category: ${det.category}, Confidence: ${det.conf.toFixed(2)}`;
            listEl.appendChild(li);
          });
        }
      })
      .catch(error => console.error('Error loading JSON:', error));
  }
  
  document.addEventListener('DOMContentLoaded', loadDashboardData);
  