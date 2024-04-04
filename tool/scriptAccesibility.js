(function (doc) {

  // Esperamos a que el DOM esté listo antes de ejecutar nuestro script
  doc.addEventListener('DOMContentLoaded', function () {

    // Crear el botón de accesibilidad
    var btnAccesibilidad = doc.createElement('button');
    btnAccesibilidad.id = 'miBotonAccesibilidad';
    btnAccesibilidad.className = 'btn-accesibilidad';
    btnAccesibilidad.setAttribute('aria-label', 'Botón para abrir la herramienta de accesibilidad');

    // Añadir atributos ARIA al botón de accesibilidad
    btnAccesibilidad.setAttribute('aria-haspopup', 'true');
    btnAccesibilidad.setAttribute('aria-controls', 'menu-accesibilidad');

    // Añadir el SVG al botón
    var iconoAccesibilidad = doc.createElement('img');
    iconoAccesibilidad.src = 'tool/icon-accessibility.svg';
    iconoAccesibilidad.alt = 'Icono de accesibilidad';
    btnAccesibilidad.appendChild(iconoAccesibilidad);

    // Crear el texto del tooltip
    var tooltipText = doc.createElement('span');
    tooltipText.className = 'tooltip-text';
    tooltipText.textContent = 'Botón de accesibilidad';
    btnAccesibilidad.appendChild(tooltipText);

    // Añadir el botón al documento
    doc.body.appendChild(btnAccesibilidad);
    dragElement(btnAccesibilidad);

    // Crear e inicializar el menú de accesibilidad
    var menuAccesibilidad = doc.createElement('div');
    menuAccesibilidad.id = 'menu-accesibilidad';
    menuAccesibilidad.className = 'menu-accesibilidad ';


    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/css/index.css';

    // Agregar el elemento link al encabezado (head) del documento
    document.head.appendChild(link);

    var script = document.createElement('script');

    // Establece el atributo src para apuntar al CDN de SimpleKeyboard
    script.src = 'https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/index.js';
    // Define una función de callback para ejecutar una vez que se haya cargado la librería
    script.onload = function () {
      // La librería SimpleKeyboard está cargada y lista para usar
      console.log('La librería SimpleKeyboard ha sido cargada.');
    };

    // Agrega el elemento script al final del body para comenzar la carga
    document.body.appendChild(script);


    menuAccesibilidad.innerHTML = '<button class="close-button">X</button><h2 class="titulo-menu">Accesibilidad</h2>' +
      '<details><summary><h3 id="high-contrast">Ajustar Colores de Texto</h3></summary>' +
      '<div id="color-texto-adjustment-container"><label class="menu-label" for="color-picker-texto">Seleccione un color:   </label><input type="color" id="color-picker-texto" ></div>' +
      '<div><label class="menu-label" for="saturacionSliderTexto">Saturación:</label><input type="range" id="saturacionSliderTexto" class="custom-slider-satu" min="0" max="100" value="50"></div>' +
      '<div><label class="menu-label" for="luminosidadSliderTexto">Luminosidad: </label><input type="range" id="luminosidadSliderTexto" class="custom-slider" min="0" max="100" value="50"></div>' +
      '<div><a id="restablecerCambiosTexto" class="restablecer-cambios-link no-underline" href="#">Restablecer color del texto</a></div></details>' +
      '<details><summary><h3 id="high-contrast">Ajustar Colores de Fondo</h3></summary>' +
      '<div id="color-fondo-adjustment-container"><label class="menu-label" for="color-picker-fondo">Seleccione un color:  </label><input type="color" id="color-picker-fondo" ></div>' +
      '<div><label class="menu-label" for="saturacionSliderFondo">Saturación:</label><input type="range" id="saturacionSliderFondo" class="custom-slider-satu" min="0" max="100" value="50"></div>' +
      '<div><label class="menu-label" for="luminosidadSliderFondo">Luminosidad: </label><input type="range" id="luminosidadSliderFondo" class="custom-slider" min="0" max="100" value="50"></div>' +
      '<div><a id="restablecerCambiosFondo" class="restablecer-cambios-link no-underline" href="#">Restablecer color de fondo</a></div></details>' +
      '<details><summary><h3 id="modo-alto-contraste">Modo de Alto Contraste</h3></summary>' +
      '<button id="toggleAltoContraste" class="btn-modificar">Alto Contraste</button></details>' +
      '<details><summary><h3>Abrir Teclado Virtual en Pantalla</h3></summary><button id="btnTeclado" class="btn-teclado">Teclado Virtual</button></summary></details>';

    doc.body.appendChild(menuAccesibilidad);

    let lastActiveInput = null;

    // Esta función se invoca con cada cambio en el teclado virtual
    function onKeyboardInput(input) {
      if (lastActiveInput) {
        lastActiveInput.value = input;
      }
    }

    // Esta función maneja el guardado del último input activo
    function onInputFocus(e) {

      lastActiveInput = e.target;
      myKeyboard.setInput(lastActiveInput.value);
    }

    // Inicialización del teclado virtual
    function initializeSimpleKeyboard() {
      dragElement(document.querySelector(".simple-keyboard"));
      var keyboardContainer = document.querySelector(".simple-keyboard");
      if (!keyboardContainer) {
        console.error("El contenedor del teclado no fue encontrado.");
        return;
      }

      // Configuración del teclado virtual
      myKeyboard = new SimpleKeyboard.default({
        onChange: onKeyboardInput,
        theme: "simple-keyboard hg-theme-default hg-layout-default",
        newLineOnEnter: true,
        debug: true,
      });

      // Muestra el contenedor del teclado
      keyboardContainer.style.display = "block";


      // Añade el evento de enfoque a todos los campos de entrada
      document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', onInputFocus);
      });
    }



    // Espera a que todo el contenido esté listo.
    setTimeout(function () {
      var btnTeclado = doc.getElementById("btnTeclado");
      if (btnTeclado) {
        btnTeclado.addEventListener('click', function () {
          var keyboardContainer = document.querySelector(".simple-keyboard");
          if (!keyboardContainer) {
            keyboardContainer = doc.createElement('div');
            keyboardContainer.className = 'simple-keyboard';
            doc.body.appendChild(keyboardContainer);
            console.log("Creando e inicializando el teclado virtual...");
            initializeSimpleKeyboard();
            dragElement(keyboardContainer);
          } else {
            console.log("El teclado virtual ya está inicializado.");
            keyboardContainer.style.display = keyboardContainer.style.display === 'none' ? 'block' : 'none';
          }
        });
      } else {
        console.log("El botón del teclado no se encontró.");
      }
    }, 0);



    function dragElement(container) {
      let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      container.onpointerdown = pointerDrag;

      function pointerDrag(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onpointermove = elementDrag;
        document.onpointerup = stopElementDrag;
      }

      function elementDrag(e) {
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        container.style.top = container.offsetTop - pos2 + "px";
        container.style.left = container.offsetLeft - pos1 + "px";
      }

      function stopElementDrag() {
        document.onpointerup = null;
        document.onpointermove = null;
      }
    }


    // Agregar eventos al botón de accesibilidad para abrir/cerrar el menú
    btnAccesibilidad.addEventListener('click', function () {
      menuAccesibilidad.classList.toggle('open');
    });


    // Cargar la biblioteca Chroma.js
    const scriptChroma = doc.createElement('script');
    scriptChroma.src = 'https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.1.1/chroma.min.js';
    scriptChroma.onload = function () {

      actualizarGradientes();
      // Función para cambiar el color del texto
      function cambiarColorTexto() {
        const colorPickerTexto = doc.getElementById('color-picker-texto');
        const luminosidadSliderTexto = doc.getElementById('luminosidadSliderTexto');
        const saturacionSliderTexto = doc.getElementById('saturacionSliderTexto');

        const colorTexto = chroma(colorPickerTexto.value).set('hsl.l', luminosidadSliderTexto.value / 100).set('hsl.s', saturacionSliderTexto.value / 100).hex();
        const colorPickerTextoValue = colorPickerTexto.value;
        const colorBaseTexto = chroma(colorPickerTextoValue);
        const colorEndTexto = chroma('grey');
        saturacionSliderTexto.style.background = `linear-gradient(to right, ${colorEndTexto}, ${colorBaseTexto})`;

        // Seleccionar todos los elementos de texto y cambiar su color simultáneamente
        const elementosTexto = doc.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, div, a, button');
        elementosTexto.forEach(elemento => {
          // Verificar si el elemento está dentro del menú de accesibilidad
          if (!elemento.closest('#menu-accesibilidad')) {
            elemento.style.color = colorTexto;
          }
        });
      }

      // Función para cambiar el color de fondo
      function cambiarColorFondo() {
        const colorPickerFondo = doc.getElementById('color-picker-fondo');
        const luminosidadSliderFondo = doc.getElementById('luminosidadSliderFondo');
        const saturacionSliderFondo = doc.getElementById('saturacionSliderFondo');

        const colorFondo = chroma(colorPickerFondo.value).set('hsl.l', luminosidadSliderFondo.value / 100).set('hsl.s', saturacionSliderFondo.value / 100).hex();
        const colorPickerFondoValue = colorPickerFondo.value;
        const colorBaseFondo = chroma(colorPickerFondoValue);
        const colorEndFondo = chroma('grey');
        saturacionSliderFondo.style.background = `linear-gradient(to right, ${colorEndFondo}, ${colorBaseFondo})`;

        // Seleccionar todos los elementos de texto y cambiar su color simultáneamente
        const elementosTexto = doc.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, div, a, button');
        elementosTexto.forEach(elemento => {
          // Verificar si el elemento está dentro del menú de accesibilidad
          if (!elemento.closest('#menu-accesibilidad')) {
            elemento.style.backgroundColor = colorFondo;
          }
        });
      }

      function actualizarGradientes() {
        const colorPickerTexto = doc.getElementById('color-picker-texto');
        const colorPickerFondo = doc.getElementById('color-picker-fondo');
        const saturacionSliderTexto = doc.getElementById('saturacionSliderTexto');
        const saturacionSliderFondo = doc.getElementById('saturacionSliderFondo');

        const colorBaseTexto = chroma(colorPickerTexto.value);
        const colorBaseFondo = chroma(colorPickerFondo.value);
        const colorEnd = chroma('grey');

        saturacionSliderTexto.style.background = `linear-gradient(to right, ${colorEnd}, ${colorBaseTexto})`;
        saturacionSliderFondo.style.background = `linear-gradient(to right, ${colorEnd}, ${colorBaseFondo})`;
      }

      // Eventos para cambiar el color de texto cuando se interactúa con los controles
      doc.getElementById('color-picker-texto').addEventListener('input', cambiarColorTexto);
      doc.getElementById('luminosidadSliderTexto').addEventListener('input', cambiarColorTexto);
      doc.getElementById('saturacionSliderTexto').addEventListener('input', cambiarColorTexto);

      doc.getElementById('color-picker-fondo').addEventListener('input', cambiarColorFondo);
      doc.getElementById('luminosidadSliderFondo').addEventListener('input', cambiarColorFondo);
      doc.getElementById('saturacionSliderFondo').addEventListener('input', cambiarColorFondo);


      // Evento para restablecer los cambios de color del texto
      doc.getElementById('restablecerCambiosTexto').addEventListener('click', function () {
        // Restablecer los valores predeterminados del color del texto
        const elementosTexto = doc.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, div, a, button');
        elementosTexto.forEach(elemento => {
          elemento.style.color = ''; // Restablecer el color a su valor predeterminado
        });
        doc.getElementById('color-picker-texto').value = '#000000';
        doc.getElementById('luminosidadSliderTexto').value = '50';
        doc.getElementById('saturacionSliderTexto').value = '50';
        actualizarGradientes();
      });

      // Evento para restablecer los cambios de color de fondo
      doc.getElementById('restablecerCambiosFondo').addEventListener('click', function () {
        // Restablecer los valores predeterminados del color de fondo
        const elementosFondo = doc.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, div, a, button');
        elementosFondo.forEach(elemento => {
          elemento.style.backgroundColor = ''; // Restablecer el color de fondo a su valor predeterminado
        });
        doc.getElementById('color-picker-texto').value = '#000000';
        doc.getElementById('luminosidadSliderFondo').value = '50';
        doc.getElementById('saturacionSliderFondo').value = '50';
        actualizarGradientes();

      });
    };

    // Agregar el script de Chroma.js al documento
    doc.head.appendChild(scriptChroma);



    //Funcion para hacer la web con contraste alto
    function toggleModoAltoContraste() {
      const elementos = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, div, a, button');
      elementos.forEach(elemento => {
        if (!elemento.closest('#menu-accesibilidad')) {
          // Comprobar si el modo de alto contraste está activo
          if (elemento.dataset.altoContraste === 'true') {
            // Restablecer estilos para el modo normal
            elemento.style.backgroundColor = '';
            elemento.style.color = '';
            elemento.style.borderColor = '';
            // Específico para enlaces
            if (elemento.tagName === 'A') {
              elemento.style.color = ''; // Aquí puedes definir el color original de tus enlaces, si es necesario
            }
            elemento.dataset.altoContraste = 'false';
          } else {
            // Aplicar estilos de alto contraste
            elemento.style.backgroundColor = 'black';
            elemento.style.color = 'white';
            elemento.style.borderColor = 'white';
            // Específico para enlaces
            if (elemento.tagName === 'A') {
              elemento.style.color = '#FFD700';
            }
            elemento.dataset.altoContraste = 'true';
          }
        }
      });
    }


    // Asegurar que el DOM se haya actualizado
    setTimeout(() => {
      // Ahora agregamos el evento al botón "Alto Contraste"
      const btnToggleAltoContraste = document.getElementById('toggleAltoContraste');
      if (btnToggleAltoContraste) {
        btnToggleAltoContraste.addEventListener('click', toggleModoAltoContraste);
      } else {
        console.error('El botón de Alto Contraste no se encontró.');
      }

    }, 0);





    // Función para cambiar el tamaño de la fuente
    function cambiarTamanoFuente(valor) {
      const elementosTexto = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, div, a, button');
      elementosTexto.forEach(elemento => {
        if (!elemento.closest('#menu-accesibilidad')) {
          elemento.style.fontSize = valor + 'px';
        }
      });
    }

    // Función para cambiar el espaciado entre líneas
    function cambiarEspaciadoLineas(valor) {
      const elementosTexto = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, div, a, button');
      elementosTexto.forEach(elemento => {
        if (!elemento.closest('#menu-accesibilidad')) {
          elemento.style.lineHeight = valor;
        }
      });
    }

    // Función para cambiar el espaciado entre palabras
    function cambiarEspaciadoPalabras(valor) {
      const elementosTexto = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, div, a, button');
      elementosTexto.forEach(elemento => {
        if (!elemento.closest('#menu-accesibilidad')) {
          elemento.style.wordSpacing = valor + 'px';
        }
      });
    }

    // Función para cambiar el espaciado entre letras
    function cambiarEspaciadoLetras(valor) {
      const elementosTexto = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, div, a, button');
      elementosTexto.forEach(elemento => {
        if (!elemento.closest('#menu-accesibilidad')) {
          elemento.style.letterSpacing = valor + 'px';
        }
      });
    }

    // Añadir los controles de accesibilidad para el tamaño de la letra y el espaciado
    menuAccesibilidad.innerHTML += '<details><summary><h3>Ajustar Texto</h3></summary>' +
      '<div><label class="menu-label" for="tamanoFuenteSlider">Tamaño de letra:</label><input type="range" id="tamanoFuenteSlider" class="txt-slider" min="12" max="30" value="16"></div>' +
      '<div><label class="menu-label" for="espaciadoLineasSlider">Espaciado entre líneas:</label><input type="range" id="espaciadoLineasSlider" class="txt-slider" min="1" max="3" value="1.6" step="0.1"></div>' +
      '<div><label class="menu-label" for="espaciadoPalabrasSlider">Espaciado entre palabras:</label><input type="range" id="espaciadoPalabrasSlider" class="txt-slider" min="0" max="20" value="0"></div>' +
      '<div><label class="menu-label" for="espaciadoLetrasSlider">Espaciado entre letras:</label><input type="range" id="espaciadoLetrasSlider" class="txt-slider" min="0" max="5" value="0"></div></details>' +
      '<details><summary><h3>Ajustar Cursor</h3></summary><button id="btnCursorNegroGrande" class="btn-cursor">Cursor Negro y Grande</button>' +
      '<a id="restablecerCursor" class="restablecer-cambios-link-cursor no-underline-cursor" href="#">Restablecer cursor</a></details>';



    // Eventos para cambiar el tamaño de la letra y el espaciado cuando se interactúa con los controles
    document.getElementById('tamanoFuenteSlider').addEventListener('input', function (event) {
      cambiarTamanoFuente(event.target.value);
    });

    document.getElementById('espaciadoLineasSlider').addEventListener('input', function (event) {
      cambiarEspaciadoLineas(event.target.value);
    });

    document.getElementById('espaciadoPalabrasSlider').addEventListener('input', function (event) {
      cambiarEspaciadoPalabras(event.target.value);
    });

    document.getElementById('espaciadoLetrasSlider').addEventListener('input', function (event) {
      cambiarEspaciadoLetras(event.target.value);
    });


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


    document.getElementById('btnCursorNegroGrande').addEventListener('click', function () {
      console.log('Botón clickeado, cambiando cursores...');
      document.body.classList.add('custom-default-cursor');

      const interactiveElements = document.querySelectorAll('a, button');
      interactiveElements.forEach(element => {
        console.log(`Cambiando cursor para: ${element.tagName}`);
        element.classList.add('custom-interactive-cursor');
      });
    });

    // Evento para restablecer el cursor a los valores predeterminados
    document.getElementById('restablecerCursor').addEventListener('click', function (e) {
      e.preventDefault(); // Prevenir la acción por defecto del enlace

      // Eliminar la clase custom-cursor del cuerpo para restablecer el cursor por defecto
      document.body.classList.remove('custom-default-cursor');

      // Eliminar la clase custom-interactive-cursor de todos los elementos interactivos
      const interactiveElements = document.querySelectorAll('.custom-interactive-cursor');
      interactiveElements.forEach(function (element) {
        element.classList.remove('custom-interactive-cursor');
      });
    });



    /*INTENTO DE QUE ME DEJE MOVER EL TECLADO VIRTUAL PERO NO FUNCIONA
    const div = document.querySelector(".simple-keyboard");
    let offsetX, offsetY;
 
    const move = (e) => {
      div.style.left = `${e.clientX - offsetX}px`;
      div.style.top = `${e.clientY - offsetY}px`;
    }
 
    div.addEventListener("mousedown", (e) => {
      e.preventDefault();
      offsetX = e.clientX - div.offsetLeft;
      offsetY = e.clientY - div.offsetTop;
      document.addEventListener("mousemove", move);
    });
 
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", move);
    });*/


    //añadir ARIA (agrega información semántica a los elementos de un sitio web proporcionando ayuda adicional como dictados por voz y guías auditivas)
    inicializarMejorasAccesibilidad();


    // Evento para cerrar el menú usando el botón de cierre
    var closeButton = menuAccesibilidad.querySelector('.close-button');
    closeButton.addEventListener('click', function () {
      menuAccesibilidad.classList.remove('open');
    });


  });


})(document);

