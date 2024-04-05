(function (doc) {
  // Sección de inicialización
  doc.addEventListener('DOMContentLoaded', function () {
    cargarEstilosYScriptsExternos();
    crearBotonAccesibilidad();
    crearMenuAccesibilidad();
    inicializarEventos();
    inicializarMejorasAccesibilidad();
    actualizarGradientes();
  });


  function cargarEstilosYScriptsExternos() {
    var link = doc.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/css/index.css';
    doc.head.appendChild(link);
  
    var script = doc.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/index.js';
    script.onload = function () {
      console.log('La librería SimpleKeyboard ha sido cargada.');
    };
    doc.body.appendChild(script);
  
    // Carga de Chroma.js
    const scriptChroma = doc.createElement('script');
    scriptChroma.src = 'https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.1.1/chroma.min.js';
    scriptChroma.onload = function () {
      // Omitido para brevedad
    };
    doc.head.appendChild(scriptChroma);
  }
  
  // Funciones de creación de componentes UI
  function crearBotonAccesibilidad() {
    var btnAccesibilidad = doc.createElement('button');
    btnAccesibilidad.id = 'miBotonAccesibilidad';
    btnAccesibilidad.className = 'btn-accesibilidad';
    btnAccesibilidad.setAttribute('aria-label', 'Botón para abrir la herramienta de accesibilidad');
    btnAccesibilidad.setAttribute('aria-haspopup', 'true');
    btnAccesibilidad.setAttribute('aria-controls', 'menu-accesibilidad');

    var iconoAccesibilidad = doc.createElement('img');
    iconoAccesibilidad.src = 'tool/icon-accessibility.svg';
    iconoAccesibilidad.alt = 'Icono de accesibilidad';
    btnAccesibilidad.appendChild(iconoAccesibilidad);

    var tooltipText = doc.createElement('span');
    tooltipText.className = 'tooltip-text';
    tooltipText.textContent = 'Botón de accesibilidad';
    btnAccesibilidad.appendChild(tooltipText);

    doc.body.appendChild(btnAccesibilidad);
    dragElement(btnAccesibilidad);
    
  }

  function crearMenuAccesibilidad() {
    var menuAccesibilidad = doc.createElement('div');
    menuAccesibilidad.id = 'menu-accesibilidad';
    menuAccesibilidad.className = 'menu-accesibilidad';

    menuAccesibilidad.innerHTML = `
  <button class="close-button">X</button>
  <h2 class="titulo-menu">Accesibilidad</h2>
  <details>
    <summary><h3>Ajustar Colores de Texto</h3></summary>
    <div id="color-texto-adjustment-container">
      <label class="menu-label" for="color-picker-texto">Seleccione un color:</label>
      <input type="color" id="color-picker-texto">
    </div>
    <div>
      <label class="menu-label" for="saturacionSliderTexto">Saturación:</label>
      <input type="range" id="saturacionSliderTexto" class="custom-slider-satu" min="0" max="100" value="50">
    </div>
    <div>
      <label class="menu-label" for="luminosidadSliderTexto">Luminosidad:</label>
      <input type="range" id="luminosidadSliderTexto" class="custom-slider" min="0" max="100" value="50">
    </div>
    <div>
      <a id="restablecerCambiosTexto" class="restablecer-cambios-link no-underline" href="#">Restablecer color del texto</a>
    </div>
  </details>
  <details>
    <summary><h3>Ajustar Colores de Fondo</h3></summary>
    <div id="color-fondo-adjustment-container">
      <label class="menu-label" for="color-picker-fondo">Seleccione un color:</label>
      <input type="color" id="color-picker-fondo">
    </div>
    <div>
      <label class="menu-label" for="saturacionSliderFondo">Saturación:</label>
      <input type="range" id="saturacionSliderFondo" class="custom-slider-satu" min="0" max="100" value="50">
    </div>
    <div>
      <label class="menu-label" for="luminosidadSliderFondo">Luminosidad:</label>
      <input type="range" id="luminosidadSliderFondo" class="custom-slider" min="0" max="100" value="50">
    </div>
    <div>
      <a id="restablecerCambiosFondo" class="restablecer-cambios-link no-underline" href="#">Restablecer color de fondo</a>
    </div>
  </details>
  <details>
    <summary><h3>Modo de Alto Contraste</h3></summary>
    <button id="toggleAltoContraste" class="btn-modificar">Alto Contraste</button>
  </details>
  <details>
    <summary><h3>Abrir Teclado Virtual en Pantalla</h3></summary>
    <button id="btnTeclado" class="btn-teclado">Teclado Virtual</button>
  </details>
  <details>
    <summary><h3>Ajustar Texto</h3></summary>
    <div>
      <label class="menu-label" for="tamanoFuenteSlider">Tamaño de letra:</label>
      <input type="range" id="tamanoFuenteSlider" class="txt-slider" min="12" max="30" value="16">
    </div>
    <div>
      <label class="menu-label" for="espaciadoLineasSlider">Espaciado entre líneas:</label>
      <input type="range" id="espaciadoLineasSlider" class="txt-slider" min="1" max="3" value="1.6" step="0.1">
    </div>
    <div>
      <label class="menu-label" for="espaciadoPalabrasSlider">Espaciado entre palabras:</label>
      <input type="range" id="espaciadoPalabrasSlider" class="txt-slider" min="0" max="20" value="0">
    </div>
    <div>
      <label class="menu-label" for="espaciadoLetrasSlider">Espaciado entre letras:</label>
      <input type="range" id="espaciadoLetrasSlider" class="txt-slider" min="0" max="5" value="0">
    </div>
  </details>
  <details>
    <summary><h3>Ajustar Cursor</h3></summary>
    <button id="btnCursorNegroGrande" class="btn-cursor">Cursor Negro y Grande</button>
    <a id="restablecerCursor" class="restablecer-cambios-link-cursor no-underline-cursor" href="#">Restablecer cursor</a>
  </details>
  <!-- Aquí puedes añadir más secciones de accesibilidad según sea necesario -->`;

    // Evento para cerrar el menú usando el botón de cierre
    var closeButton = menuAccesibilidad.querySelector('.close-button');
    closeButton.addEventListener('click', function () {
      menuAccesibilidad.classList.remove('open');
    });

    doc.body.appendChild(menuAccesibilidad);
    inicializarEventos();
  }


  // Funciones de manipulación de la UI
  function dragElement(container) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (document.getElementById(container.id + "header")) {
      // Si existe, el encabezado es donde puedes mover el DIV desde:
      document.getElementById(container.id + "header").onpointerdown = pointerDrag;
    } else {
      // De lo contrario, mueve el DIV desde cualquier lugar dentro del DIV:
      container.onpointerdown = pointerDrag;
    }

    function pointerDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // Obtener la posición del ratón en el inicio:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onpointerup = closeDragElement;
      // Llamar a una función cuando el cursor se mueve:
      document.onpointermove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // Calcular la nueva posición del cursor:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // Establecer la nueva posición del elemento:
      container.style.top = (container.offsetTop - pos2) + "px";
      container.style.left = (container.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // Detener el movimiento cuando se suelta el botón del ratón:
      document.onpointerup = null;
      document.onpointermove = null;
    }
  }


  function actualizarGradientes() {
    // Se asume la existencia de controles deslizantes para la saturación y luminosidad
    // tanto del texto como del fondo, y selección de color para cada uno.
    const colorPickerTexto = document.getElementById('color-picker-texto');
    const colorPickerFondo = document.getElementById('color-picker-fondo');
    const saturacionSliderTexto = document.getElementById('saturacionSliderTexto');
    const luminosidadSliderTexto = document.getElementById('luminosidadSliderTexto');
    const saturacionSliderFondo = document.getElementById('saturacionSliderFondo');
    const luminosidadSliderFondo = document.getElementById('luminosidadSliderFondo');

    // Actualizar el gradiente del control deslizante de saturación para el texto
    if (saturacionSliderTexto) {
      const colorBaseTexto = chroma(colorPickerTexto.value).saturate().hex();
      const colorFinalTexto = chroma(colorPickerTexto.value).desaturate().hex();
      saturacionSliderTexto.style.background = `linear-gradient(to right, ${colorFinalTexto}, ${colorBaseTexto})`;
    }

    // Actualizar el gradiente del control deslizante de luminosidad para el texto
    if (luminosidadSliderTexto) {
      const colorClaroTexto = chroma(colorPickerTexto.value).brighten().hex();
      const colorOscuroTexto = chroma(colorPickerTexto.value).darken().hex();
      luminosidadSliderTexto.style.background = `linear-gradient(to right, ${colorOscuroTexto}, ${colorClaroTexto})`;
    }

    // Actualizar el gradiente del control deslizante de saturación para el fondo
    if (saturacionSliderFondo) {
      const colorBaseFondo = chroma(colorPickerFondo.value).saturate().hex();
      const colorFinalFondo = chroma(colorPickerFondo.value).desaturate().hex();
      saturacionSliderFondo.style.background = `linear-gradient(to right, ${colorFinalFondo}, ${colorBaseFondo})`;
    }

    // Actualizar el gradiente del control deslizante de luminosidad para el fondo
    if (luminosidadSliderFondo) {
      const colorClaroFondo = chroma(colorPickerFondo.value).brighten().hex();
      const colorOscuroFondo = chroma(colorPickerFondo.value).darken().hex();
      luminosidadSliderFondo.style.background = `linear-gradient(to right, ${colorOscuroFondo}, ${colorClaroFondo})`;
    }
  }


  // Funciones de evento
  function inicializarEventos() {
    // Evento para abrir/cerrar el menú de accesibilidad con el botón principal
    btnAccesibilidad.addEventListener('click', function () {
      menuAccesibilidad.classList.toggle('open');
    });

    // Eventos para interacciones específicas del menú de accesibilidad
    doc.getElementById('color-picker-texto').addEventListener('input', function () {
      cambiarColorTexto();
      actualizarGradientes();
    });

    doc.getElementById('color-picker-fondo').addEventListener('input', function () {
      cambiarColorFondo();
      actualizarGradientes();
    });

    doc.getElementById('restablecerCambiosTexto').addEventListener('click', function (e) {
      e.preventDefault();
      restablecerCambiosTexto(); // Asume que esta función está definida para restablecer los cambios
    });

    doc.getElementById('restablecerCambiosFondo').addEventListener('click', function (e) {
      e.preventDefault();
      restablecerCambiosFondo(); // Asume que esta función está definida para restablecer los cambios
    });

    doc.getElementById('toggleAltoContraste').addEventListener('click', function () {
      toggleModoAltoContraste();
    });

    // Añadir más eventos según sea necesario

    // Observador de mutaciones para mejorar contenido dinámico
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length) {
          // Aplica mejoras de accesibilidad a los nuevos nodos añadidos al DOM
          mejorarContenidoDinamico();
        }
      });
    });

    observer.observe(doc.body, { childList: true, subtree: true });
  }

doc.addEventListener('DOMContentLoaded', function () {
  crearBotonAccesibilidad();
  crearMenuAccesibilidad();
  cargarEstilosYScriptsExternos();
  inicializarEventos();
  inicializarMejorasAccesibilidad(); // Asume que esta función está definida para añadir ARIA y otras mejoras
});


// Funciones de accesibilidad
function inicializarMejorasAccesibilidad() {
  asignarRolesSemanticos();
  mejorarNavegacion();
  mejorarFormularios();
  mejorarElementosInteractivos();
  mejorarContenidoDinamico();
}

function asignarRolesSemanticos() {
  // Navegación
  document.querySelectorAll('nav').forEach(nav => {
    if (!nav.hasAttribute('role')) {
      nav.setAttribute('role', 'navigation');
    }
  });

  // Encabezados principales
  document.querySelectorAll('header').forEach(header => {
    if (!header.closest('section, article') && !header.hasAttribute('role')) { // Solo si no es parte de una sección o artículo
      header.setAttribute('role', 'banner');
    }
  });

  // Contenido principal
  document.querySelectorAll('main').forEach(main => {
    if (!main.hasAttribute('role')) {
      main.setAttribute('role', 'main');
    }
  });

  // Pie de página
  document.querySelectorAll('footer').forEach(footer => {
    if (!footer.closest('section, article') && !footer.hasAttribute('role')) { // Solo si no es parte de una sección o artículo
      footer.setAttribute('role', 'contentinfo');
    }
  });
}

function mejorarNavegacion() {
  // ARIA Labels para elementos de navegación
  document.querySelectorAll('nav').forEach((nav, index) => {
    const label = nav.getAttribute('aria-label') || `Navegación ${index + 1}`;
    nav.setAttribute('aria-label', label);
  });
}

function mejorarFormularios() {
  // Roles para campos de formulario
  document.querySelectorAll('form').forEach(form => {
    form.setAttribute('role', 'form');
    form.querySelectorAll('input, select, textarea, button, fieldset').forEach(el => {
      if (el.tagName.toLowerCase() === 'fieldset' && !el.hasAttribute('role')) {
        el.setAttribute('role', 'group');
      }
    });
  });
}

function mejorarElementosInteractivos() {
  // Mejora de botones y enlaces
  document.querySelectorAll('button, [role="button"], a[href]').forEach(btn => {
    if (!btn.hasAttribute('role')) {
      btn.setAttribute('role', 'button');
    }
  });
}

function mejorarContenidoDinamico() {
  // Observar cambios en el DOM para aplicar mejoras a contenido dinámico
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) { // Asegurar que es un nodo de tipo Elemento
            // Aplicar mejoras de accesibilidad a nuevos nodos
            asignarRolesSemanticos();
            mejorarNavegacion();
            mejorarFormularios();
            mejorarElementosInteractivos();
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

}) (document);
