const niveles = [...]; // OMITIDO AQUÍ POR ESPACIO, SE AGREGARÁ COMPLETO EN SIGUIENTE PASO
const malla = document.getElementById("malla");
const estado = JSON.parse(localStorage.getItem("estadoMaterias")) || {};

niveles.forEach(nivel => {
  const columna = document.createElement("div");
  columna.className = "semestre";
  const titulo = document.createElement("h2");
  titulo.textContent = nivel.ciclo;
  columna.appendChild(titulo);

  nivel.materias.forEach(m => {
    const div = document.createElement("div");
    div.className = "materia";
    div.textContent = m.nombre;
    div.dataset.id = m.id;
    div.onclick = () => aprobar(m.id);
    if (!estado[m.id]) {
      estado[m.id] = {
        aprobada: false,
        requisitos: m.requisitos || [],
        desbloquea: m.desbloquea || [],
      };
    }
    estado[m.id].div = div;
    if (!estado[m.id].requisitos || estado[m.id].requisitos.length === 0) {
      desbloquear(m.id);
    }
    columna.appendChild(div);
  });

  malla.appendChild(columna);
});

function desbloquear(id) {
  const m = estado[id];
  if (!m.aprobada) m.div.classList.add("desbloqueada");
}

function aprobar(id) {
  const m = estado[id];
  if (m.aprobada) return;
  m.aprobada = true;
  m.div.classList.remove("desbloqueada");
  m.div.classList.add("aprobada");
  m.div.onclick = null;
  for (const clave in estado) {
    const r = estado[clave];
    if (!r.aprobada && r.requisitos.every(req => estado[req].aprobada)) {
      desbloquear(clave);
    }
  }
  localStorage.setItem("estadoMaterias", JSON.stringify(estado));
}

window.addEventListener("load", () => {
  for (const id in estado) {
    if (estado[id].aprobada) {
      estado[id].div?.classList.add("aprobada");
      estado[id].div?.classList.remove("desbloqueada");
      estado[id].div.onclick = null;
    } else if (estado[id].requisitos.length === 0 || estado[id].requisitos.every(req => estado[req]?.aprobada)) {
      desbloquear(id);
    }
  }
});
