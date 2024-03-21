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

    // Crear e inicializar el menú de accesibilidad
    var menuAccesibilidad = doc.createElement('div');
    menuAccesibilidad.id = 'menu-accesibilidad';
    menuAccesibilidad.className = 'menu-accesibilidad';
    menuAccesibilidad.innerHTML = '<button class="close-button">X</button><h2 class="titulo-menu">Accesibilidad</h2><label><h3 id="high-contrast">Ajustar Colores de Texto</h3></label>' +
      '<div id="color-texto-adjustment-container"><label class="menu-label" for="color-picker-texto">Seleccione un color:   </label><input type="color" id="color-picker-texto" ></div>' +
      '<div><label class="menu-label" for="saturacionSliderTexto">Saturación:</label><input type="range" id="saturacionSliderTexto" class="custom-slider" min="0" max="100" value="50"></div>' +
      '<div><label class="menu-label" for="luminosidadSliderTexto">Luminosidad: </label><input type="range" id="luminosidadSliderTexto" class="custom-slider" min="0" max="100" value="50"></div>' +
      '<div><a id="restablecerCambiosTexto" class="restablecer-cambios-link no-underline" href="#">Restablecer color del texto</a></div>' +
      '<label><h3 id="high-contrast">Ajustar Colores de Fondo</h3></label>' +
      '<div id="color-fondo-adjustment-container"><label for="color-picker-fondo">Seleccione un color:  </label><input type="color" id="color-picker-fondo" ></div>' +
      '<div><label class="menu-label" for="saturacionSliderFondo">Saturación:</label><input type="range" id="saturacionSliderFondo" class="custom-slider" min="0" max="100" value="50"></div>' +
      '<div><label class="menu-label" for="luminosidadSliderFondo">Luminosidad: </label><input type="range" id="luminosidadSliderFondo" class="custom-slider" min="0" max="100" value="50"></div>' +
      '<div><a id="restablecerCambiosFondo" class="restablecer-cambios-link no-underline" href="#">Restablecer color de fondo</a></div>';

    doc.body.appendChild(menuAccesibilidad);

   // Variables para registrar la posición inicial del ratón
   var startX = 0;
   var startY = 0;

   // Evento mousedown para registrar la posición inicial del ratón
   btnAccesibilidad.addEventListener('mousedown', function (event) {
     startX = event.clientX;
     startY = event.clientY;
   });

   // Evento mouseup para comparar la posición final del ratón y abrir el menú si no se ha movido el botón
   btnAccesibilidad.addEventListener('mouseup', function (event) {
     var endX = event.clientX;
     var endY = event.clientY;
     var distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)); // Calcular la distancia total
     if (distance < 5) { // Considerar que el botón no se ha movido si la distancia es menor a 5 píxeles
       menuAccesibilidad.style.width = menuAccesibilidad.style.width === '350px' ? '0' : '350px';
     }
   });


    // Evento para cerrar el menú usando el botón de cierre
    var closeButton = menuAccesibilidad.querySelector('.close-button');
    closeButton.addEventListener('click', function () {
      menuAccesibilidad.style.width = '0';
    });

    // Cargar la biblioteca Chroma.js
    const scriptChroma = doc.createElement('script');
    scriptChroma.src = 'https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.1.1/chroma.min.js';
    scriptChroma.onload = function () {

      // Función para cambiar el color del texto
      function cambiarColorTexto() {
        const colorPickerTexto = doc.getElementById('color-picker-texto');
        const luminosidadSliderTexto = doc.getElementById('luminosidadSliderTexto');
        const saturacionSliderTexto = doc.getElementById('saturacionSliderTexto');

        const colorTexto = chroma(colorPickerTexto.value).set('hsl.l', luminosidadSliderTexto.value / 100).set('hsl.s', saturacionSliderTexto.value / 100).hex();

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

        // Seleccionar todos los elementos de texto y cambiar su color simultáneamente
        const elementosTexto = doc.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, div, a, button');
        elementosTexto.forEach(elemento => {
          // Verificar si el elemento está dentro del menú de accesibilidad
          if (!elemento.closest('#menu-accesibilidad')) {
            elemento.style.backgroundColor = colorFondo;
          }
        });
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
      });

      // Evento para restablecer los cambios de color de fondo
      doc.getElementById('restablecerCambiosFondo').addEventListener('click', function () {
        // Restablecer los valores predeterminados del color de fondo
        const elementosFondo = doc.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, div, a, button');
        elementosFondo.forEach(elemento => {
          elemento.style.backgroundColor = ''; // Restablecer el color de fondo a su valor predeterminado
        });
      });

    };

    // Agregar el script de Chroma.js al documento
    doc.head.appendChild(scriptChroma);

  });
})(document);

