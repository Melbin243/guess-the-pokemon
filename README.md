# 🎮 Guess the Pokémon (¿Quién es ese Pokémon?)

¡Bienvenido al proyecto **Guess the Pokémon**! Esta es una aplicación web interactiva inspirada en el clásico minijuego del anime de Pokémon "¿Quién es ese Pokémon?". El objetivo es adivinar el nombre del Pokémon que aparece en pantalla a partir de su silueta.

El proyecto está desarrollado con **Vue 3** utilizando la **Composition API**, **TypeScript**, **Pinia** para la gestión del estado, **Bootstrap 5** para estilos y diseño responsivo, y **Axios** para consumir la **PokéAPI**.

---

## 🚀 Características Principales

- **Consumo de PokéAPI en Tiempo Real**: Obtiene de manera aleatoria información y arte oficial de cualquiera de los primeros **151 Pokémon** (Primera Generación).
- **Mecánica de Silueta Dinámica**: El Pokémon se muestra inicialmente como una silueta oscura (usando filtros CSS `brightness(0)`). Una vez respondido el nombre, se revela a todo color con una suave animación de transición.
- **Normalización Inteligente de Texto**: El sistema limpia y normaliza el input del usuario y el nombre oficial de la PokéAPI (remueve acentos, convierte a minúsculas, elimina espacios adicionales y caracteres especiales como guiones o puntos), asegurando que respuestas válidas no sean rechazadas por pequeñas discrepancias de escritura.
- **Diseño Responsivo e Intuitivo**: Interfaz moderna, minimalista y adaptable a dispositivos móviles gracias a la integración de Bootstrap 5.
- **Indicador de Carga (Spinner)**: Pantalla de carga integrada para ofrecer un feedback visual mientras se obtienen los datos del servidor.
- **Gestor de Estado Desacoplado**: Lógica del juego centralizada en un Composable especializado (`useGameManager`).

---

## 🛠️ Tecnologías y Librerías Utilizadas

- **Core**: [Vue 3](https://vuejs.org/) (Composition API con `<script setup lang="ts">`)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Bootstrap 5](https://getbootstrap.com/)
- **Manejador de Estado**: [Pinia](https://pinia.vuejs.org/)
- **Peticiones HTTP**: [Axios](https://axios-http.com/)
- **Herramienta de Construcción**: [Vite](https://vite.dev/)
- **Calidad de Código**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/) y [Oxlint](https://oxlint.github.io/)

---

## 📂 Estructura del Proyecto

A continuación se detalla la estructura principal del código fuente (`src`):

```text
src/
├── components/
│   ├── PokemonDisplay.vue   # Muestra la silueta o imagen real del Pokémon con efectos CSS.
│   ├── PokemonForm.vue      # Formulario con campo de entrada y botón de acción para enviar la respuesta.
│   ├── PokemonResult.vue    # Panel de alerta que indica si el resultado fue correcto o incorrecto y ofrece volver a jugar.
│   └── Spinner.vue          # Componente visual para mostrar el estado de carga.
├── composables/
│   └── useGameManager.ts    # Composable para manejar el estado global del juego (jugando, acierto, error) y flujos.
├── router/
│   └── index.ts             # Configuración y enrutamiento básico de la aplicación.
├── service/
│   └── pokemon.service.ts   # Peticiones HTTP a la PokéAPI y algoritmos de normalización de cadenas.
├── types/
│   └── pokemon.interface.ts # Definición de tipos y contratos TypeScript para la entidad Pokémon.
├── utils/
│   └── random-number.ts     # Utilidad para la generación de números aleatorios para los IDs de los Pokémon.
├── App.vue                  # Componente raíz que orquesta los submódulos de la pantalla del juego.
└── main.ts                  # Punto de entrada de la aplicación, configuración de plugins (Pinia, Bootstrap, Router) y montaje del DOM.
```

---

## ⚙️ Requisitos Previos

Asegúrate de tener instalado en tu sistema local:

- **Node.js**: Versión `^22.18.0` o superior (se recomienda `>=24.12.0`).
- **NPM** (o tu gestor de paquetes de preferencia como Yarn o PNPM).

---

## 🔧 Instalación y Configuración

1. **Clonar el repositorio**:

   ```sh
   git clone https://github.com/tu-usuario/guess-the-pokemon.git
   cd guess-the-pokemon
   ```

2. **Instalar dependencias**:

   ```sh
   npm install
   ```

3. **Ejecutar en modo desarrollo**:
   ```sh
   npm run dev
   ```
   La aplicación estará disponible localmente en `http://localhost:5173`.

---

## 🛠️ Comandos Disponibles

En el directorio del proyecto puedes ejecutar los siguientes scripts configurados en el `package.json`:

| Comando              | Descripción                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `npm run dev`        | Inicia el servidor de desarrollo local con Vite.                                                                  |
| `npm run build`      | Compila TypeScript y construye la aplicación optimizada para producción.                                          |
| `npm run preview`    | Previsualiza localmente el build de producción generado.                                                          |
| `npm run type-check` | Valida los tipos TypeScript utilizando `vue-tsc`.                                                                 |
| `npm run lint`       | Ejecuta de manera secuencial los linters `oxlint` y `eslint` para corregir estilos de código de forma automática. |
| `npm run format`     | Da formato a todo el código fuente en la carpeta `src/` utilizando Prettier.                                      |

---

## 🧠 Lógica de Normalización de Nombres

Para que la experiencia de juego sea amigable, el servicio de Pokémon (`src/service/pokemon.service.ts`) implementa una función de normalización que elimina tildes/acentos, convierte todo a minúsculas y remueve caracteres que puedan causar falsos negativos:

```typescript
const normalizePokemonName = (name: string): string => {
  return name
    .toLocaleLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina acentos/diacríticos
    .replace(/[^a-z0-9]/g, '') // Elimina caracteres no alfanuméricos (guiones, puntos, etc.)
}
```

Esto permite que respuestas como "Farfetch'd" o "Mr. Mime" sean validadas correctamente tanto si el usuario escribe "farfetchd", "Farfetchd" o "mr mime".

---
