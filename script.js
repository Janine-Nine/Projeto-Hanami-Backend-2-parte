const API_BASE = "http://localhost:3000";

function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("uploadStatus");
  const progressBar = document.getElementById("progressBar");

  if (!fileInput.files.length) {
    status.textContent = "Selecione um arquivo CSV ou XLSX.";
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", `${API_BASE}/upload`);

  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      const percent = (e.loaded / e.total) * 100;
      progressBar.style.width = percent + "%";
    }
  };

  xhr.onload = () => {
    if (xhr.status === 200) {
      status.textContent = "Upload concluído com sucesso.";
    } else {
      status.textContent = "Erro no upload.";
    }
  };

  xhr.onerror = () => {
    status.textContent = "Erro de conexão com a API.";
  };

  xhr.send(formData);
}

function getReport(type) {
  const output = document.getElementById("reportOutput");
  output.textContent = "Carregando relatório...";

  fetch(`${API_BASE}/reports/${type}`)
    .then(res => res.json())
    .then(data => {
      output.textContent = JSON.stringify(data, null, 2);
    })
    .catch(() => {
      output.textContent = "Erro ao buscar relatório.";
    });
}
