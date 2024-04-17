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
      initializeKeyboardAndEvents();
    };

    // Agrega el elemento script al final del body para comenzar la carga
    document.body.appendChild(script);


    menuAccesibilidad.innerHTML =
      '<div class="language-selector-container"><img src="tool/world-icon.png" alt="Icono de mundo" id="icono" class="world-icon"><select id="language-selector" class="language-selector">' +
      '<option value="es">Español</option><option value="en">English</option></select></div>' +
      '<button class="close-button">X</button><h2 class="titulo-menu" data-key="menuTitle">MENÚ DE ACCESIBILIDAD</h2>' +
      '<details><summary><h3 data-key="easyReading">Lectura Fácil</h3><img id="img-ll" src="tool/icon-lectura-facil.png"></summary><button id="lecturaFacil" class="btn-img" data-key="activateEasyReading">Activar Lectura Fácil</button></summary></details>' +
      '<details><summary><h3 id="high-contrast" data-key="adjustTextColor">Ajustar Colores de Texto</h3></summary>' +
      '<div id="color-texto-adjustment-container"><label class="menu-label" for="color-picker-texto" data-key="selectColor">Seleccione un color:</label><input type="color" id="color-picker-texto" ></div>' +
      '<div><label class="menu-label" for="saturacionSliderTexto" data-key="saturation">Saturación:</label><input type="range" id="saturacionSliderTexto" class="custom-slider-satu" min="0" max="100" value="50"></div>' +
      '<div><label class="menu-label" for="luminosidadSliderTexto" data-key="brightness">Luminosidad:</label><input type="range" id="luminosidadSliderTexto" class="custom-slider" min="0" max="100" value="50"></div>' +
      '<div><a id="restablecerCambiosTexto" class="restablecer-cambios-link no-underline" href="#" data-key="resetTextColor">Restablecer color del texto</a></div></details>' +
      '<details><summary><h3 id="high-contrast" data-key="adjustBackgroundColor">Ajustar Colores de Fondo</h3></summary>' +
      '<div id="color-fondo-adjustment-container"><label class="menu-label" for="color-picker-fondo" data-key="selectColor">Seleccione un color:</label><input type="color" id="color-picker-fondo" ></div>' +
      '<div><label class="menu-label" for="saturacionSliderFondo" data-key="saturation">Saturación:</label><input type="range" id="saturacionSliderFondo" class="custom-slider-satu" min="0" max="100" value="50"></div>' +
      '<div><label class="menu-label" for="luminosidadSliderFondo" data-key="brightness">Luminosidad:</label><input type="range" id="luminosidadSliderFondo" class="custom-slider" min="0" max="100" value="50"></div>' +
      '<div><a id="restablecerCambiosFondo" class="restablecer-cambios-link no-underline" href="#" data-key="resetBackgroundColor">Restablecer color de fondo</a></div></details>' +
      '<details><summary><h3 id="modo-alto-contraste" data-key="highContrastMode">Modo de Alto Contraste</h3></summary>' +
      '<button id="toggleAltoContraste" class="btn-modificar" data-key="highContrast">Alto Contraste</button></details>' +
      '<details><summary><h3 data-key="openVirtualKeyboard">Abrir Teclado Virtual en Pantalla</h3></summary><button id="btnTeclado" class="btn-teclado" data-key="openVirtualKeyboard">Abrir Teclado Virtual</button></summary></details>' +
      '<details><summary><h3 data-key="hideMultimedia">Ocultar Contenido Multimedia (imágenes/vídeos...)</h3></summary><button id="ocultarImg" class="btn-img" data-key="hideMultimedia">Ocultar Multimedia</button></summary></details>';

    doc.body.appendChild(menuAccesibilidad);





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
    menuAccesibilidad.innerHTML += '<details><summary><h3 data-key="adjustText">Ajustar Texto</h3></summary>' +
      '<div><label class="menu-label" for="tamanoFuenteSlider" data-key="fontSize">Tamaño de letra:</label><input type="range" id="tamanoFuenteSlider" class="txt-slider" min="12" max="30" value="16"></div>' +
      '<div><label class="menu-label" for="espaciadoLineasSlider" data-key="lineSpacing">Espaciado entre líneas:</label><input type="range" id="espaciadoLineasSlider" class="txt-slider" min="1" max="3" value="1.6" step="0.1"></div>' +
      '<div><label class="menu-label" for="espaciadoPalabrasSlider" data-key="wordSpacing">Espaciado entre palabras:</label><input type="range" id="espaciadoPalabrasSlider" class="txt-slider" min="0" max="20" value="0"></div>' +
      '<div><label class="menu-label" for="espaciadoLetrasSlider" data-key="letterSpacing">Espaciado entre letras:</label><input type="range" id="espaciadoLetrasSlider" class="txt-slider" min="0" max="5" value="0"></div></details>' +
      '<details><summary><h3 data-key="adjustCursor">Ajustar Cursor</h3></summary><button id="btnCursorNegroGrande" class="btn-cursor" data-key="cursorBlackLarge">Cursor Negro y Grande</button></details>' +
      '<details><summary><h3 data-key="stylizeButtons">Estilizar Botones</h3></summary><button id="btnEstilizarBotones" class="btn-cursor" data-key="activateButtonStyle">Activar Estilo de Botones</button></details>' +
      '<details><summary><h3 data-key="readingGuide">Guía de Lectura</h3></summary><button id="btnGuiaLecturaNegra" class="btn-otros-black" data-key="activateBlackReadingGuide">Activar Guía de Lectura Negra</button><div id="guiaLecturaNegra"></div>' +
      '<button id="btnGuiaLecturaBlanca" class="btn-otros" data-key="activateWhiteReadingGuide">Activar Guía de Lectura Blanca</button><div id="guiaLecturaBlanca"></div></details>' +
      '<details><summary><h3 data-key="textReader">Lector de Texto</h3></summary><select id="voiceSelect" class="select-voice"></select><button id="btnLector" class="btn-otros" data-key="activateTextReader">Activar Lector de Texto</button></details>' +
      '<details><summary><h3 data-key="subtitle">Subtítulos</h3></summary><button id="btnSubtitle" class="btn-cursor" data-key="activateSubtitle">Activar Subtítulos</button></details>' +
      '<button id="guardar" class="btn-save" data-key="save">Guardar Preferencias</button>';
    ;


    function populateVoiceList() {
      if (typeof speechSynthesis === "undefined" || !speechSynthesis.getVoices) {
        console.error('La síntesis de voz no está disponible.');
        return;
      }

      // Esperar un breve momento para que las voces estén disponibles
      setTimeout(() => {
        const voices = speechSynthesis.getVoices();
        if (!voices || voices.length === 0) {
          console.warn('No se han encontrado voces disponibles.');
          return;
        }

        const voiceSelect = document.getElementById("voiceSelect");
        voiceSelect.innerHTML = ''; // Limpiar opciones anteriores
        for (let i = 0; i < voices.length; i++) {
          const option = document.createElement("option");
          option.textContent = `${voices[i].name} (${voices[i].lang})`;

          if (voices[i].default) {
            option.textContent += " — DEFAULT";
          }

          option.setAttribute("data-lang", voices[i].lang);
          option.setAttribute("data-name", voices[i].name);
          voiceSelect.appendChild(option);
        }
      }, 100);
    }

    if (typeof speechSynthesis !== "undefined" && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    var synth = window.speechSynthesis;

    // Función para iniciar la lectura desde el principio
    function iniciarLectura() {
      const vozSeleccionada = document.getElementById('voiceSelect').value;
      const textoParaLeer = document.body.innerText;
      const utterThis = new SpeechSynthesisUtterance(textoParaLeer);

      // Seleccionar la voz según la opción del menú desplegable
      const voices = synth.getVoices();
      const selectedVoice = voices.find(v => `${v.name} (${v.lang})` === vozSeleccionada);
      if (selectedVoice) {
        utterThis.voice = selectedVoice;
        console.log(selectedVoice.name);
      }

      // Detener cualquier lectura previa y empezar desde el principio
      synth.cancel();
      synth.speak(utterThis);

    }


    // Función para activar/desactivar el lector de texto en voz alta
    function leerEnVozAlta() {
      const btnLector = document.getElementById('btnLector');
      const lang = document.getElementById('language-selector').value;
      const lecturaEnVozAltaActivada = btnLector.dataset.lecturaEnVozAltaActivada === 'true';

      if (!lecturaEnVozAltaActivada) {
        btnLector.style.backgroundColor = 'yellow';
        btnLector.style.fontWeight = '700';
        btnLector.textContent = translations[lang]['deactivateTextReader'];

        iniciarLectura(); // Iniciar la lectura desde el principio
        btnLector.dataset.lecturaEnVozAltaActivada = 'true';
      } else {
        btnLector.style.backgroundColor = 'white';
        btnLector.style.fontWeight = '400';
        btnLector.textContent = translations[lang]['activateTextReader'];

        synth.cancel(); // Detener la lectura
        btnLector.dataset.lecturaEnVozAltaActivada = 'false';
      }
    }

    populateVoiceList();

    document.getElementById('btnLector').addEventListener('click', leerEnVozAlta);




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
      const lang = document.getElementById('language-selector').value;
      // Verificar si el cuerpo ya tiene la clase para determinar el estado actual
      if (document.body.classList.contains('custom-default-cursor')) {
        console.log('Restableciendo cursores a predeterminados...');
        document.body.classList.remove('custom-default-cursor');

        // Eliminar la clase custom-interactive-cursor de todos los elementos interactivos
        const interactiveElements = document.querySelectorAll('.custom-interactive-cursor');
        interactiveElements.forEach(element => {
          element.classList.remove('custom-interactive-cursor');
        });

        // Restablecer el color del botón
        this.textContent = translations[lang]['cursorBlackLarge'];
        this.style.backgroundColor = '';
        this.style.fontWeight = '400';
        this.dataset.cursorActivo = 'false';
      } else {
        console.log('Botón clickeado, cambiando cursores...');
        document.body.classList.add('custom-default-cursor');

        // Aplicar la clase custom-interactive-cursor a todos los elementos interactivos
        const interactiveElements = document.querySelectorAll('a, button');
        interactiveElements.forEach(element => {
          console.log(`Cambiando cursor para: ${element.tagName}`);
          element.classList.add('custom-interactive-cursor');
        });

        // Cambiar el color del botón a amarillo
        this.style.backgroundColor = 'yellow';
        this.style.fontWeight = '700';
        this.textContent = translations[lang]['deactivateCursor'];
        this.dataset.cursorActivo = 'true';
      }
    });


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

    

    /*Espera a que todo el contenido esté listo.
    setTimeout(function () {
      var btnTeclado = document.getElementById("btnTeclado");
      if (btnTeclado) {
        btnTeclado.addEventListener('click', function () {
          const lang = document.getElementById('language-selector').value;
          var keyboardContainer = document.querySelector(".simple-keyboard");
          if (!keyboardContainer) {
            // Crear y configurar el teclado virtual si no existe
            keyboardContainer = document.createElement('div');
            keyboardContainer.className = 'simple-keyboard';
            document.body.appendChild(keyboardContainer);
            initializeSimpleKeyboard();
            dragElement(keyboardContainer);
            btnTeclado.dataset.open = 'true'; // Indica que el teclado está abierto
          }
          // Alternar la visibilidad y actualizar el estado y el texto del botón
          if (keyboardContainer.style.display === 'none' || !keyboardContainer.style.display) {
            keyboardContainer.style.display = 'block';
            btnTeclado.dataset.open = 'true';
            btnTeclado.textContent = translations[lang]['closeVirtualKeyboard'];
            btnTeclado.style.background = 'yellow';
            btnTeclado.style.fontWeight = '700';
          } else {
            keyboardContainer.style.display = 'none';
            btnTeclado.dataset.open = 'false';
            btnTeclado.textContent = translations[lang]['openVirtualKeyboard'];
            btnTeclado.style.background = 'white';
            btnTeclado.style.fontWeight = '400';
          }
        });
      } else {
        console.log("El botón del teclado no se encontró.");
      }
    }, 0);*/




    function initializeKeyboardAndEvents() {
      var keyboardContainer = document.querySelector(".simple-keyboard");
      var btnTeclado = document.getElementById("btnTeclado");
  
      // Si el contenedor del teclado no existe, créalo antes de inicializar el teclado
      if (!keyboardContainer) {
          keyboardContainer = document.createElement('div');
          keyboardContainer.className = 'simple-keyboard';
          document.body.appendChild(keyboardContainer);
      }
  
      if (btnTeclado) {
          btnTeclado.addEventListener('click', function () {
              const lang = document.getElementById('language-selector').value;
              toggleKeyboardVisibility(keyboardContainer, btnTeclado, lang);
          });
      } else {
          console.log("El botón del teclado no se encontró.");
      }
  
      // Ahora inicializa el teclado con el contenedor seguro en el DOM
      initializeSimpleKeyboard();
  }
  
  function initializeSimpleKeyboard() {
      var keyboardContainer = document.querySelector(".simple-keyboard");
      if (!keyboardContainer) {
          console.error("El contenedor del teclado no fue encontrado después de la creación.");
          return;
      }
     
      keyboardContainer.style.background = 'lightblue';
  
      // Configuración del teclado virtual
      myKeyboard = new SimpleKeyboard.default({
          onChange: onKeyboardInput,
          theme: "simple-keyboard hg-theme-default hg-layout-default",
          newLineOnEnter: true,
          debug: true,
      });
      keyboardContainer.style.display = "none";
      dragElement(keyboardContainer);
  
      // Añade el evento de enfoque a todos los campos de entrada
      document.querySelectorAll('input').forEach(input => {
          input.addEventListener('focus', onInputFocus);
      });
  }
  
  
  function toggleKeyboardVisibility(keyboardContainer, btnTeclado, lang) {
      if (keyboardContainer.style.display === 'none' || !keyboardContainer.style.display) {
          keyboardContainer.style.display = 'block';
          btnTeclado.dataset.open = 'true';
          btnTeclado.textContent = translations[lang]['closeVirtualKeyboard'];
          btnTeclado.style.background = 'yellow';
          btnTeclado.style.fontWeight = '700';
      } else {
          keyboardContainer.style.display = 'none';
          btnTeclado.dataset.open = 'false';
          btnTeclado.textContent = translations[lang]['openVirtualKeyboard'];
          btnTeclado.style.background = 'white';
          btnTeclado.style.fontWeight = '400';
      }
  }
  

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

    let estilosOriginales = new Map();

    function actualizarEstilosTexto() {
      var body = document.body;
      const lang = document.getElementById('language-selector').value;
      var btnLecturaFacil = document.getElementById('lecturaFacil');

      if (body.classList.contains('textoArial')) {
        btnLecturaFacil.style.backgroundColor = 'white';
        btnLecturaFacil.style.fontWeight = '400';
        btnLecturaFacil.textContent = translations[lang]['easyReading'];
        body.classList.remove('textoArial');

        document.querySelectorAll('body, body *').forEach(elemento => {
          if (estilosOriginales.has(elemento)) {
            let estilos = estilosOriginales.get(elemento);
            elemento.style.fontFamily = estilos.fontFamily;
            elemento.style.fontSize = estilos.fontSize;
            elemento.style.textAlign = estilos.textAlign;
          }
        });

        estilosOriginales.clear();
        btnLecturaFacil.dataset.estiloAplicado = 'false';
      } else {
        btnLecturaFacil.style.backgroundColor = 'yellow';
        btnLecturaFacil.style.fontWeight = '700';
        btnLecturaFacil.textContent = translations[lang]['deactivateEasyReading'];
        body.classList.add('textoArial');

        document.querySelectorAll('body, body *').forEach(elemento => {
          let estilosActuales = {
            fontFamily: elemento.style.fontFamily,
            fontSize: elemento.style.fontSize,
            textAlign: elemento.style.textAlign
          };
          estilosOriginales.set(elemento, estilosActuales);
          elemento.style.textAlign = 'left';
          elemento.style.fontFamily = 'Arial, sans-serif';
          let tamanoActual = window.getComputedStyle(elemento, null).fontSize;
          if (parseFloat(tamanoActual) < 16) {
            elemento.style.fontSize = '16px';
          }
        });
        btnLecturaFacil.dataset.estiloAplicado = 'true';
      }
    }

    document.getElementById('lecturaFacil').addEventListener('click', actualizarEstilosTexto);



    function ocultarImagenes() {
      var elementosOcultos = false;
      const lang = document.getElementById('language-selector').value;
      var visible = document.getElementById('ocultarImg').dataset.visible === 'true';
      document.querySelectorAll('img, svg, video, iframe').forEach(function (el) {
        if (el.id !== 'miBotonAccesibilidad' && el.id !== 'img-ll' && !el.closest('#menu-accesibilidad') && el.id !== 'icono') { // Excluyendo el botón de accesibilidad
          el.style.visibility = el.style.visibility === 'hidden' ? '' : 'hidden';
          if (el.style.visibility === 'hidden') elementosOcultos = true;
        }
      });

      document.querySelectorAll('*').forEach(function (el) {
        if ((el.currentStyle ? el.currentStyle.backgroundImage !== 'none' : getComputedStyle(el, null).backgroundImage !== 'none') &&
          el.id !== 'miBotonAccesibilidad' && el.id !== 'img-ll' && !el.closest('#menu-accesibilidad')) {
          el.style.visibility = el.style.visibility === 'hidden' ? '' : 'hidden';
          if (el.style.visibility === 'hidden') elementosOcultos = true;
        }
      });

      var boton = document.getElementById('ocultarImg');
      if (elementosOcultos) {
        boton.style.backgroundColor = 'yellow';
        boton.style.fontWeight = '700';
        boton.textContent = translations[lang]['showMultimedia'];
        boton.dataset.visible = 'true';
      } else {
        boton.style.backgroundColor = 'white';
        boton.style.fontWeight = '400';
        boton.textContent = translations[lang]['hideMultimedia'];
        boton.dataset.visible = 'false';
      }
    }

    document.getElementById('ocultarImg').addEventListener('click', ocultarImagenes);



    function estilizarBotones() {
      const lang = document.getElementById('language-selector').value;
      var todosLosBotones = document.querySelectorAll('button');
      var botones = Array.from(todosLosBotones).filter(function (btn) {
        return !btn.closest('#menu-accesibilidad');
      });


      // Comprobar si el estilo ya se aplicó antes
      var estiloAplicado = document.getElementById('btnEstilizarBotones').dataset.estiloAplicado === 'true';

      botones.forEach(function (btn) {
        if (estiloAplicado) {
          // Si el estilo ya fue aplicado, removemos el estilo
          btn.style.border = '';
        } else {
          // Si el estilo no fue aplicado, lo añadimos
          btn.style.border = '4px solid yellow';
        }
      });

      // Alternar el estado de activación y el color del botón de activación
      var btnActivacion = document.getElementById('btnEstilizarBotones');
      if (estiloAplicado) {
        btnActivacion.style.backgroundColor = 'white';
        btnActivacion.style.fontWeight = '400';
        btnActivacion.textContent = translations[lang]['activateButtonStyle'];
        btnActivacion.dataset.estiloAplicado = 'false';
      } else {
        btnActivacion.style.backgroundColor = 'yellow';
        btnActivacion.style.fontWeight = '700';
        btnActivacion.textContent = translations[lang]['deactivateButtonStyle'];
        btnActivacion.dataset.estiloAplicado = 'true';
      }
    }

    document.getElementById('btnEstilizarBotones').addEventListener('click', estilizarBotones);



    function guiaLecturaNegra() {
      const lang = document.getElementById('language-selector').value;
      var guia = document.getElementById('guiaLecturaNegra');
      var btn = document.getElementById('btnGuiaLecturaNegra');

      // Verificar si la guía está visible
      if (guia.style.display === 'block') {
        guia.style.display = 'none';
        btn.style.backgroundColor = 'white';
        btn.style.fontWeight = '400';
        btn.textContent = translations[lang]['activateBlackReadingGuide'];
        document.removeEventListener('mousemove', moverGuiaConRatonNegra);
        btn.dataset.active = 'false';
      } else {
        guia.style.display = 'block';
        btn.style.backgroundColor = 'yellow';
        btn.style.fontWeight = '700';
        btn.textContent = translations[lang]['deactivateBlackReadingGuide'];
        document.addEventListener('mousemove', moverGuiaConRatonNegra);
        btn.dataset.active = 'true';
      }
    }

    document.getElementById('btnGuiaLecturaNegra').addEventListener('click', guiaLecturaNegra);

    function moverGuiaConRatonNegra(e) {
      var guia = document.getElementById('guiaLecturaNegra');
      // Establecer la posición de la guía en la coordenada Y del ratón
      guia.style.top = `${e.clientY}px`;
    }
    // Mover la guía con las teclas de flecha
    document.addEventListener('keydown', function (event) {
      var guia = document.getElementById('guiaLecturaNegra');
      if (guia.style.display === 'block') { // Si la guía está visible
        if (event.key === 'ArrowDown') {
          guia.style.top = `${parseInt(guia.style.top) + 10}px`;
        } else if (event.key === 'ArrowUp') {
          guia.style.top = `${parseInt(guia.style.top) - 10}px`;
        }
      }
    });


    function guiaLecturaBlanca() {
      const lang = document.getElementById('language-selector').value;
      var guia = document.getElementById('guiaLecturaBlanca');
      var btn = document.getElementById('btnGuiaLecturaBlanca');

      // Verificar si la guía está visible
      if (guia.style.display === 'block') {
        guia.style.display = 'none';
        btn.style.backgroundColor = 'white';
        btn.style.fontWeight = '400';
        btn.textContent = translations[lang]['activateWhiteReadingGuide'];
        document.removeEventListener('mousemove', moverGuiaConRatonBlanca);
        btn.dataset.active = 'false';
      } else {
        guia.style.display = 'block';
        btn.style.backgroundColor = 'yellow';
        btn.style.fontWeight = '700';
        btn.textContent = translations[lang]['deactivateWhiteReadingGuide'];
        document.addEventListener('mousemove', moverGuiaConRatonBlanca);
        btn.dataset.active = 'true';
      }
    }

    document.getElementById('btnGuiaLecturaBlanca').addEventListener('click', guiaLecturaBlanca);

    function moverGuiaConRatonBlanca(e) {
      var guia = document.getElementById('guiaLecturaBlanca');
      // Establecer la posición de la guía en la coordenada Y del ratón
      guia.style.top = `${e.clientY}px`;
    }
    // Mover la guía con las teclas de flecha
    document.addEventListener('keydown', function (event) {
      var guia = document.getElementById('guiaLecturaBlanca');
      if (guia.style.display === 'block') { // Si la guía está visible
        if (event.key === 'ArrowDown') {
          guia.style.top = `${parseInt(guia.style.top) + 10}px`;
        } else if (event.key === 'ArrowUp') {
          guia.style.top = `${parseInt(guia.style.top) - 10}px`;
        }
      }
    });



    //Funcion para hacer la web con contraste alto
    function toggleModoAltoContraste() {
      const lang = document.getElementById('language-selector').value;
      const btnToggleAltoContraste = document.getElementById('toggleAltoContraste');
      const elementos = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, div, a, button');
      var modoAltoContrasteActivado = btnToggleAltoContraste.dataset.altoContraste === 'true';

      elementos.forEach(elemento => {
        if (!elemento.closest('#menu-accesibilidad')) {
          if (modoAltoContrasteActivado) {
            // Restablecer estilos para el modo normal
            elemento.style.backgroundColor = '';
            elemento.style.color = '';
            elemento.style.borderColor = '';
          } else {
            // Aplicar estilos de alto contraste
            elemento.style.backgroundColor = 'black';
            elemento.style.color = 'white';
            elemento.style.borderColor = 'white';
            if (elemento.tagName === 'A') {
              elemento.style.color = 'yellow';
            }
          }
        }
      });

      modoAltoContrasteActivado = !modoAltoContrasteActivado; // Cambiar el estado
      btnToggleAltoContraste.dataset.altoContraste = modoAltoContrasteActivado ? 'true' : 'false';
      btnToggleAltoContraste.textContent = modoAltoContrasteActivado ? translations[lang]['deactivateHighContrast'] : translations[lang]['highContrast'];
      btnToggleAltoContraste.style.backgroundColor = modoAltoContrasteActivado ? 'yellow' : 'white';
      btnToggleAltoContraste.style.fontWeight = modoAltoContrasteActivado ? '700' : '400';
    }

    document.getElementById('toggleAltoContraste').addEventListener('click', toggleModoAltoContraste);





    function activateSubtitles() {
      const lang = document.getElementById('language-selector').value;
      const btnSubtitle = document.getElementById('btnSubtitle');
      const subtitlesActivated = btnSubtitle.dataset.activated === 'true';

      document.querySelectorAll('iframe[src*="youtube.com/embed/"]').forEach(iframe => {
        let src = iframe.src;

        // Asegurar que enablejsapi=1 está presente
        if (!src.includes('enablejsapi=1')) {
          src += (src.includes('?') ? '&' : '?') + 'enablejsapi=1';
        }

        if (subtitlesActivated) {
          src = src.replace('&cc_load_policy=1', '').replace('?cc_load_policy=1', '');
          btnSubtitle.dataset.activated = 'false';
          btnSubtitle.style.backgroundColor = 'white';
          btnSubtitle.style.fontWeight = '400';
          btnSubtitle.textContent = translations[lang]['activateSubtitle'];
        } else {
          if (!src.includes('cc_load_policy=1')) {
            src += '&cc_load_policy=1';
          }
          btnSubtitle.dataset.activated = 'true';
          btnSubtitle.style.backgroundColor = 'yellow';
          btnSubtitle.style.fontWeight = '700';
          btnSubtitle.textContent = translations[lang]['deactivateSubtitle'];
        }
        console.log("URL:", src);
        iframe.src = src;
        console.log("URL del iframe:", iframe.src);
      });
    }
    // Asignar la función al botón de activar subtítulos
    document.getElementById('btnSubtitle').addEventListener('click', activateSubtitles);



    var translations = {
      'es': {
        'menuTitle': 'MENÚ DE ACCESIBILIDAD',
        'easyReading': 'Activar Lectura Fácil',
        'adjustTextColor': 'Ajustar Colores de Texto',
        'selectColor': 'Seleccione un color:',
        'saturation': 'Saturación:',
        'brightness': 'Luminosidad:',
        'resetTextColor': 'Restablecer color del texto',
        'adjustBackgroundColor': 'Ajustar Colores de Fondo',
        'resetBackgroundColor': 'Restablecer color de fondo',
        'highContrastMode': 'Modo de Alto Contraste',
        'subtitle': 'Subtítulos',
        'highContrast': 'Activar Alto Contraste',
        'openVirtualKeyboard': 'Abrir Teclado Virtual',
        'hideMultimedia': 'Ocultar Multimedia',
        'adjustText': 'Ajustar Texto',
        'fontSize': 'Tamaño de letra:',
        'lineSpacing': 'Espaciado entre líneas:',
        'wordSpacing': 'Espaciado entre palabras:',
        'letterSpacing': 'Espaciado entre letras:',
        'adjustCursor': 'Ajustar Cursor',
        'cursorBlackLarge': 'Cursor Negro y Grande',
        'stylizeButtons': 'Estilizar Botones',
        'activateButtonStyle': 'Activar Estilo de Botones',
        'readingGuide': 'Guía de Lectura',
        'activateBlackReadingGuide': 'Activar Guía de Lectura Negra',
        'activateWhiteReadingGuide': 'Activar Guía de Lectura Blanca',
        'textReader': 'Lector de Texto',
        'activateTextReader': 'Activar Lector de Texto',
        'activateSubtitle': 'Activar Subtítulos',
        'deactivateEasyReading': 'Desactivar Lectura Fácil',
        'deactivateHighContrast': 'Desactivar Alto Contraste',
        'deactivateButtonStyle': 'Desactivar Estilo de Botones',
        'closeVirtualKeyboard': 'Cerrar Teclado Virtual',
        'showMultimedia': 'Mostrar Multimedia',
        'deactivateCursor': 'Desactivar Cursor',
        'deactivateTextReader': 'Desactivar Lector de Texto',
        'deactivateBlackReadingGuide': 'Desactivar Guía de Lectura Negra',
        'deactivateWhiteReadingGuide': 'Desactivar Guía de Lectura Blanca',
        'deactivateSubtitle': 'Desactivar Subtítulos',
        'save': 'Guardar Preferencias'
      },
      'en': {
        'menuTitle': 'ACCESSIBILITY MENU',
        'easyReading': 'Activate Easy Reading',
        'adjustTextColor': 'Adjust Text Colors',
        'selectColor': 'Select a color:',
        'saturation': 'Saturation:',
        'brightness': 'Brightness:',
        'subtitle': 'Subtitles',
        'resetTextColor': 'Reset text color',
        'adjustBackgroundColor': 'Adjust Background Colors',
        'resetBackgroundColor': 'Reset background color',
        'highContrastMode': 'High Contrast Mode',
        'highContrast': 'Activate High Contrast',
        'openVirtualKeyboard': 'Open Virtual Keyboard',
        'hideMultimedia': 'Hide Multimedia',
        'adjustText': 'Adjust Text',
        'fontSize': 'Font Size:',
        'lineSpacing': 'Line Spacing:',
        'wordSpacing': 'Word Spacing:',
        'letterSpacing': 'Letter Spacing:',
        'adjustCursor': 'Adjust Cursor',
        'cursorBlackLarge': 'Black and Large Cursor',
        'stylizeButtons': 'Stylize Buttons',
        'activateButtonStyle': 'Activate Buttons Style',
        'readingGuide': 'Reading Guide',
        'activateBlackReadingGuide': 'Activate Black Reading Guide',
        'activateWhiteReadingGuide': 'Activate White Reading Guide',
        'textReader': 'Text Reader',
        'activateTextReader': 'Activate Text Reader',
        'activateSubtitle': 'Active Subtitles',
        'deactivateEasyReading': 'Disable Easy Reading',
        'deactivateHighContrast': 'Disable High Contrast',
        'deactivateButtonStyle': 'Disable Buttons Style',
        'closeVirtualKeyboard': 'Close Virtual Keyboard',
        'showMultimedia': 'Show Multimedia',
        'deactivateCursor': 'Disable Cursor',
        'deactivateTextReader': 'Disable Text Reader',
        'deactivateBlackReadingGuide': 'Disable Black Reading Guide',
        'deactivateWhiteReadingGuide': 'Disable White Reading Guide',
        'deactivateSubtitle': 'Disable Subtitles',
        'save': 'Save Preferences'
      }
    };

    // Evento para el selector de idioma
    document.getElementById('language-selector').addEventListener('change', function (event) {
      const newLang = event.target.value;
      changeLanguage(newLang);
      updateDynamicButtonLanguages(newLang);
    });

    // Función para cambiar el idioma de los textos del menú de accesibilidad
    function changeLanguage(lang) {
      var elements = document.querySelectorAll('#menu-accesibilidad [data-key]');
      elements.forEach(function (el) {
        var key = el.getAttribute('data-key');
        el.textContent = translations[lang][key] || el.textContent;
      });
    }

    // Función para actualizar los textos de botones que cambian dinámicamente
    function updateDynamicButtonLanguages(lang) {
      var btnLecturaFacil = document.getElementById('lecturaFacil');
      if (btnLecturaFacil) {
        btnLecturaFacil.textContent = btnLecturaFacil.dataset.open ? translations[lang]['deactivateEasyReading'] : translations[lang]['easyReading'];
      }
      var btnTeclado = document.getElementById('btnTeclado');
      if (btnTeclado) {
        btnTeclado.textContent = btnTeclado.dataset.open ? translations[lang]['closeVirtualKeyboard'] : translations[lang]['openVirtualKeyboard'];
      }
      var ocultarImg = document.getElementById('ocultarImg');
      if (ocultarImg) {
        ocultarImg.textContent = ocultarImg.dataset.visible ? translations[lang]['showMultimedia'] : translations[lang]['hideMultimedia'];
      }
      var toggleAltoContraste = document.getElementById('toggleAltoContraste');
      if (toggleAltoContraste) {
        toggleAltoContraste.textContent = toggleAltoContraste.dataset.altoContraste === 'true' ? translations[lang]['deactivateHighContrast'] : translations[lang]['highContrast'];
      }
      var btnCursorNegroGrande = document.getElementById('btnCursorNegroGrande');
      if (btnCursorNegroGrande) {
        btnCursorNegroGrande.textContent = btnCursorNegroGrande.dataset.active === 'true' ? translations[lang]['deactivateCursor'] : translations[lang]['cursorBlackLarge'];
      }
      var btnEstilizarBotones = document.getElementById('btnEstilizarBotones');
      if (btnEstilizarBotones) {
        btnEstilizarBotones.textContent = btnEstilizarBotones.dataset.estiloAplicado === 'true' ? translations[lang]['deactivateButtonStyle'] : translations[lang]['activateButtonStyle'];
      }
      var btnLector = document.getElementById('btnLector');
      if (btnLector) {
        btnLector.textContent = btnLector.dataset.active === 'true' ? translations[lang]['deactivateTextReader'] : translations[lang]['activateTextReader'];
      }
      var btnGuiaLecturaNegra = document.getElementById('btnGuiaLecturaNegra');
      if (btnGuiaLecturaNegra) {
        btnGuiaLecturaNegra.textContent = btnGuiaLecturaNegra.dataset.active === 'true' ? translations[lang]['deactivateBlackReadingGuide'] : translations[lang]['activateBlackReadingGuide'];
      }

      var btnGuiaLecturaBlanca = document.getElementById('btnGuiaLecturaBlanca');
      if (btnGuiaLecturaBlanca) {
        btnGuiaLecturaBlanca.textContent = btnGuiaLecturaBlanca.dataset.active === 'true' ? translations[lang]['deactivateWhiteReadingGuide'] : translations[lang]['activateWhiteReadingGuide'];
      }
    }


    function guardarEstado() {
      const preferencias = {
        tecladoVirtual: document.getElementById('btnTeclado').dataset.open === 'true',
        altoContraste: document.getElementById('toggleAltoContraste').dataset.altoContraste === 'true',
        estilosBotones: document.getElementById('btnEstilizarBotones').dataset.estiloAplicado === 'true',
        guiaLecturaNegra: document.getElementById('btnGuiaLecturaNegra').dataset.active === 'true',
        guiaLecturaBlanca: document.getElementById('btnGuiaLecturaBlanca').dataset.active === 'true',
        ocultarMultimedia: document.getElementById('ocultarImg').dataset.visible === 'true',
        lecturaFacil: document.getElementById('lecturaFacil').dataset.estiloAplicado === 'true', // Modificado para usar dataset
        cursorNegroGrande: document.getElementById('btnCursorNegroGrande').dataset.cursorActivo === 'true',
        leerVozAlta: document.getElementById('btnLector').dataset.lecturaEnVozAltaActivada === 'true',
        vozSeleccionada: document.getElementById('voiceSelect').value,

      };

      localStorage.setItem('preferenciasAccesibilidad', JSON.stringify(preferencias));
      alert('Preferencias guardadas correctamente');
      console.log('Estados guardados:', preferencias);
    }

    function cargarEstado() {
      const preferenciasGuardadas = localStorage.getItem('preferenciasAccesibilidad');
      if (preferenciasGuardadas) {
        const preferencias = JSON.parse(preferenciasGuardadas);
        console.log('Cargando estados:', preferencias);

        // Seleccionar la voz guardada si está disponible
        if (preferencias.vozSeleccionada) {
          const voiceSelect = document.getElementById('voiceSelect');
          const availableVoices = Array.from(voiceSelect.options).map(option => option.value);
          if (availableVoices.includes(preferencias.vozSeleccionada)) {
            voiceSelect.value = preferencias.vozSeleccionada;
          } else {
            console.log('La voz seleccionada no está disponible, seleccionando la voz predeterminada.');
            // Aquí puedes elegir una voz predeterminada o simplemente dejar que el selector permanezca sin seleccionar.
          }
        }
        if (preferencias.tecladoVirtual) {
          document.getElementById('btnTeclado').click();
        }
        if (preferencias.altoContraste) {
          document.getElementById('toggleAltoContraste').click();
        }
        if (preferencias.estilosBotones) {
          document.getElementById('btnEstilizarBotones').click();
        }
        if (preferencias.guiaLecturaNegra) {
          document.getElementById('btnGuiaLecturaNegra').click();
        }
        if (preferencias.guiaLecturaBlanca) {
          document.getElementById('btnGuiaLecturaBlanca').click();
        }
        if (preferencias.ocultarMultimedia) {
          document.getElementById('ocultarImg').click();
        }
        if (preferencias.lecturaFacil) {
          document.getElementById('lecturaFacil').click();
        }
        if (preferencias.cursorNegroGrande) {
          document.getElementById('btnCursorNegroGrande').click();
        }

        if (preferencias.leerVozAlta) {
          document.getElementById('btnLector').click();

        }
        // Cargar más características según sea necesario
      }
    }

    cargarEstado();

    document.getElementById('guardar').addEventListener('click', guardarEstado);

    //añadir ARIA (agrega información semántica a los elementos de un sitio web proporcionando ayuda adicional como dictados por voz y guías auditivas)
    inicializarMejorasAccesibilidad();


    // Evento para cerrar el menú usando el botón de cierre
    var closeButton = menuAccesibilidad.querySelector('.close-button');
    closeButton.addEventListener('click', function () {
      menuAccesibilidad.classList.remove('open');
    });


  });


})(document);

