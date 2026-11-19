# Uso de inteligencia artificial en OurHours

## 1. Introducción

La inteligencia artificial puede servir como apoyo para explorar soluciones, proponer estructuras de componentes y simplificar problemas concretos durante el desarrollo de OurHours. El código del repositorio contiene comentarios que declaran asistencia de IA en dos áreas: el filtro de fechas y la página de inicio de sesión/registro. Esa evidencia no permite atribuir a IA el resto del proyecto ni reconstruir conversaciones originales.

Los prompts de este documento son **reconstrucciones** redactadas a partir del comportamiento y la estructura visibles en el código. No son transcripciones ni prompts históricos.

## 2. Filtro de fechas

### Problema que resuelve

Permite reducir la lista de actividades para mostrar las que ocurren hoy o dentro de los próximos siete días, además de aplicar simultáneamente los filtros de tipo y horas.

### Cómo funciona

La página `Actividades` conserva en estado React el término de búsqueda y las selecciones de filtros. Un `useMemo` recorre el arreglo estático de actividades y combina las condiciones: búsqueda por nombre o lugar, tipo exacto, fecha y cantidad de horas. Para el rango semanal compara la fecha de la actividad con la fecha actual y con `7 * 864e5` milisegundos.

### Archivos involucrados

- `src/pages/Pages.jsx`: estado de filtros y cálculo de la lista filtrada.
- `src/components/FilterBar.jsx`: controles de categoría, fecha y horas.
- `src/components/SearchBar.jsx`: campo de búsqueda.
- `src/data/activities.js`: fechas y atributos usados como criterios.

### Asistencia declarada en el código

Un comentario junto a la condición semanal indica que ese filtro recibió ayuda de IA para simplificar el cálculo de fechas. Es una declaración escrita en el código; no es evidencia independiente sobre el proceso completo ni sobre otras funcionalidades.

### Prompt reconstruido

> En React, implementa una lista de actividades con búsqueda por nombre o lugar y filtros combinables por categoría, fecha y horas reconocidas. Mantén los valores de búsqueda y filtros en estado local, y calcula los resultados a partir de un arreglo estático. Incluye las opciones “Hoy” y “Próximos 7 días”, categorías cultural, deportiva, académica y voluntariado, y filtros de 2 horas o 3 horas en adelante. Muestra el total de resultados y un estado vacío. Usa `useMemo` si resulta apropiado y evita errores de zona horaria al comparar fechas.

## 3. Inicio de sesión y registro

### Funcionamiento de la autenticación simulada

`Auth` sirve para inicio de sesión y registro mediante la propiedad `register`. Al superar las validaciones, guarda en el contexto el nombre y el correo, y navega a `/perfil`. No verifica las credenciales contra un servidor ni las guarda como una cuenta persistente. En el inicio de sesión, cualquier correo válido y contraseña de longitud suficiente crea un usuario de demostración.

### Validaciones de formularios

- El registro requiere nombre.
- Ambos formularios requieren correo y contraseña.
- El correo debe cumplir una expresión regular básica.
- La contraseña debe tener al menos ocho caracteres.
- El registro compara la contraseña con su confirmación.
- Los errores se muestran en el formulario.

La validación es del lado del cliente y está pensada para la demo; no sustituye la autenticación ni validación de un servicio seguro.

### Persistencia local

El usuario activo se persiste mediante `AppContext` en `localStorage`, en la clave `oh-user`. La contraseña no se utiliza para verificar una cuenta ni forma parte del objeto de usuario persistido.

### Archivos involucrados

- `src/pages/Pages.jsx`: formulario `Auth`, validaciones y navegación.
- `src/context/AppContext.jsx`: estado de usuario y persistencia.
- `src/main.jsx`: rutas `/login`, `/registro` y envoltura de las páginas protegidas.

### Evidencia de asistencia declarada

Un comentario antes del componente `Auth` dice que se utilizó IA para crear la página de login y registro y que la seguridad y validación podrían mejorarse. Esta es una declaración en el código, no una prueba independiente de autoría o del historial de prompts.

El componente `Protected` actualmente referencia `<Login />`, aunque `Pages.jsx` no declara ni importa un componente con ese nombre; la página disponible se exporta como `Auth`. Por tanto, el flujo de acceso protegido requiere corrección para funcionar como se espera. Esta observación documenta el estado del código y no implica que se haya modificado la autenticación.

### Prompt reconstruido

> Crea en React un formulario de inicio de sesión y registro simulados para una SPA. El registro debe pedir nombre, correo, contraseña y confirmación; el inicio de sesión debe pedir correo y contraseña. Valida campos vacíos, formato básico de correo, mínimo de ocho caracteres y coincidencia de contraseñas en el registro, con mensajes claros. Al completar el formulario, guarda únicamente nombre y correo en un contexto que los persiste localmente y navega al perfil. No presentes el flujo como autenticación real ni guardes la contraseña. Añade rutas protegidas que utilicen el componente de acceso existente.

## 4. Mapa interactivo

### Funcionamiento

La página `Mapa` ofrece un selector de sedes y elige una imagen local para cada sede: `jardin.jpg`, `csu.jpg` y `Bosque.jpg`. Cada objeto de actividad contiene un campo de sede y coordenadas porcentuales `x` e `y`. `MapPin` representa cada actividad como un botón posicionado sobre la imagen. Al seleccionar uno, la página muestra su información y enlaces al detalle e inscripción. La búsqueda reduce los marcadores visibles por nombre o lugar.

Es una imagen con marcadores superpuestos, no una integración GIS: no utiliza mapas de teselas, geolocalización ni una librería cartográfica. La asignación de coordenadas tiene que corresponder visualmente a cada imagen. En los datos actuales la sede `EL BOSQUE` no tiene actividades asociadas, y las actividades 1 y 2 comparten coordenadas.

### Archivos involucrados

- `src/pages/Pages.jsx`: estado de sede/selección, filtro e imagen activa.
- `src/components/MapPin.jsx`: marcador individual.
- `src/data/activities.js`: sede y coordenadas de cada actividad.
- `src/imgs/jardin.jpg`, `src/imgs/csu.jpg`, `src/imgs/Bosque.jpg`: imágenes locales.

### Prompt reconstruido

> Implementa en React una página de mapa de actividades del campus usando una imagen local distinta por sede. Añade un selector de sedes y coloca marcadores como botones accesibles con posiciones porcentuales `x` e `y` tomadas de los datos de cada actividad. Al seleccionar un marcador, muestra nombre, descripción, lugar, fecha, hora y horas HL, con enlaces al detalle e inscripción. Incluye búsqueda por nombre o lugar y limpia la selección al cambiar de sede. Usa React y CSS propios, sin librerías de mapas ni backend. Deja los datos listos para reemplazar las coordenadas por datos reales.

## 5. Sistema de actividades y filtros

### Funcionamiento

Las doce actividades de muestra viven en `src/data/activities.js`. `ActivityCard` presenta datos resumidos, enlace al detalle, acción de favorito y botón de inscripción. `Detalle` localiza una actividad por ID de ruta. `Actividades` compone búsqueda y filtros para presentar un subconjunto de tarjetas. `Calendario` descarta eventos pasados, ordena por fecha y agrupa actividades por día.

La inscripción agrega el ID a `enrollments` en el contexto. Las tarjetas cambian su texto a “Inscrita”; en el mapa y el detalle aparece también un mensaje de confirmación. Los datos no provienen de una API y no hay validación de cupos o confirmación externa.

### Archivos involucrados

- `src/data/activities.js`: datos estáticos.
- `src/pages/Pages.jsx`: lista, filtros, detalle, calendario y botón de inscripción.
- `src/components/ActivityCard.jsx`: tarjeta reutilizable y acciones.
- `src/components/SearchBar.jsx` y `src/components/FilterBar.jsx`: controles.
- `src/context/AppContext.jsx`: estado persistente de inscripciones y favoritos.

### Prompt reconstruido

> Implementa una experiencia de actividades en React con datos locales que incluyan ID, nombre, categoría, lugar, fecha, hora, horas HL y descripción. Crea tarjetas reutilizables, una página de detalle y un calendario agrupado por fecha. Añade búsqueda por nombre o lugar y filtros combinables por categoría, fecha y horas. Permite inscribirse desde tarjetas, detalle y mapa, evita inscripciones duplicadas y conserva los IDs en `localStorage`. Muestra el estado de inscripción y un mensaje de confirmación. No agregues backend ni librerías de UI.

## 6. Perfil y progreso

### Funcionamiento

`REQUIRED_HOURS` define una meta de 100 horas. `Perfil` busca los IDs guardados en `completed`, suma las horas de esas actividades y pasa el total y la meta a `ProgressBar`. La barra calcula el porcentaje, lo limita a 100 y presenta el total completado y las horas restantes. También muestra las actividades inscritas.

El historial depende de `completed`, pero ninguna interfaz marca una actividad como completada: aunque el contexto expone `setCompleted`, no hay una acción de usuario que la invoque. Por eso el perfil no puede acumular progreso desde el flujo normal de la aplicación; inscribirse no registra horas cursadas.

### Archivos involucrados

- `src/data/constants.js`: meta `REQUIRED_HOURS`.
- `src/pages/Pages.jsx`: perfil, suma de horas e historial.
- `src/components/ProgressBar.jsx`: cálculo y presentación del porcentaje.
- `src/context/AppContext.jsx`: persistencia de `completed` e inscripciones.

### Prompt reconstruido

> Crea un perfil de estudiante en React que muestre nombre, correo, próximas actividades e historial de actividades completadas. Suma las horas HL de las actividades completadas y calcula el porcentaje frente a una meta exportada desde un archivo de constantes, inicialmente de 100 horas. Presenta horas realizadas, horas faltantes y barra de progreso con componentes reutilizables. Persiste el historial localmente y añade una acción clara para marcar una actividad como completada; no conviertas una inscripción automáticamente en horas cursadas.

## 7. Preguntas frecuentes

### Funcionamiento

`FAQ` declara las preguntas y respuestas como datos estáticos y las entrega al componente `Accordion`. Este mantiene un índice local (`open`): abre una pregunta a la vez y permite cerrarla al pulsarla de nuevo. La respuesta sobre la meta utiliza `REQUIRED_HOURS`.

### Archivos involucrados

- `src/pages/Pages.jsx`: contenido y estructura de la página FAQ.
- `src/components/Accordion.jsx`: estado local y expansión/cierre.
- `src/data/constants.js`: valor usado en la respuesta sobre la meta.
- `src/styles/global.css`: estilos del acordeón.

### Prompt reconstruido

> Construye una página de preguntas frecuentes en español con React. Define las preguntas y respuestas en una lista de objetos y crea un componente `Accordion` reutilizable. Permite abrir una pregunta y cerrar la actual al volver a pulsarla; mantén como máximo una abierta. Usa botones accesibles con `aria-expanded`, estilos responsive y respuestas legibles. Haz que la respuesta de la meta use la constante compartida, sin duplicar el número en el texto.

## 8. Estado global y persistencia

### Funcionamiento

`AppProvider` centraliza el usuario, favoritos, inscripciones, actividades completadas y tema. Cada estado se inicializa leyendo su clave de `localStorage` y se persiste mediante un efecto cuando cambia. El tema, además, actualiza `document.documentElement.dataset.theme` para activar las variables CSS del modo oscuro. `ActivityCard` consume las acciones de favoritos e inscripción; el perfil consume usuario, inscripciones y completadas.

Esta persistencia se limita al navegador/dispositivo actual, no sincroniza con un servidor ni separa los datos por cuenta. Es almacenamiento de demostración y no un sistema de identidad o de registro oficial de horas.

### Archivos involucrados

- `src/context/AppContext.jsx`: estados, acciones y persistencia.
- `src/components/ActivityCard.jsx`: consumo del estado para favoritos e inscripción.
- `src/components/Header.jsx`: toggle de tema.
- `src/pages/Pages.jsx`: consumo en mapa, perfil, favoritos y acceso.
- `src/styles/global.css`: variables y reglas del tema oscuro.

### Prompt reconstruido

> Implementa un contexto global React para usuario de demostración, favoritos, inscripciones, actividades completadas y tema. Inicializa cada estado desde `localStorage` con manejo de JSON inválido y persiste cada cambio. Expón acciones para alternar favoritos, inscribirse sin duplicar IDs, cerrar sesión y alternar tema. Actualiza un atributo del elemento raíz para que el CSS aplique el tema oscuro. Mantén claro que la persistencia es local y no sincroniza cuentas entre dispositivos.

## 9. Reflexión final

La IA puede acelerar el desarrollo al sugerir estructuras, generar un primer borrador de componentes y proponer formas de abordar cálculos o validaciones. Ese apoyo no reemplaza la revisión técnica: es necesario entender cómo fluye el estado entre páginas, comprobar que los nombres de componentes y rutas existen, probar casos límite y validar el comportamiento en navegadores y tamaños de pantalla distintos.

En OurHours, los comentarios del código declaran asistencia de IA para el filtro de fechas y para login/registro. Para las demás áreas, los prompts aquí incluidos son reconstrucciones orientativas basadas en la implementación observada, no evidencia de que esas funcionalidades se hayan generado con IA ni conversaciones originales.
