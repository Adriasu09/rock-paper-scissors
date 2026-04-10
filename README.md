Este es el apartado de visual studio code del navbar donde vamos a crear el empiece de la página web.

# ✂️ Piedra, Papel o Tijera — AZARGame | Carnival DOM

Bienvenida al equipo de desarrollo! 👋 Este README explica cómo trabajar en el repositorio y cómo gestionar las tareas del proyecto usando GitHub Projects. Léelo con calma antes de empezar.

---

## 🎮 Contexto del proyecto

La empresa **AZARGame** nos ha contratado para desarrollar su nueva línea de negocio: **"Juegos típicos de ferias"**. Nuestro equipo se encarga del juego de **Piedra, Papel o Tijera**, desarrollado con **HTML, CSS y JavaScript**.

---

## 🌿 ¿Cómo está organizado el repositorio?

| Rama | Para qué sirve |
| ----------- | ------------------------------------------------------------- |
| `main` | Código final en producción. **Nadie sube aquí directamente.** |
| `develop` | Rama de integración. **Tampoco se sube directamente.** |
| `tu-rama` | Tu rama personal según la tarea. **Aquí es donde tú trabajas.** |

> ⚠️ **Regla de oro:** Nunca hagas cambios directamente en `main` ni en `develop`. Todo tu trabajo va en tu rama personal.

---

## 📋 Convención para nombrar ramas

Las ramas siguen las convenciones estándar de GitHub según el tipo de tarea:

| Prefijo | Cuándo usarlo | Ejemplo |
|---------|--------------|---------|
| `feat/` | Para añadir una nueva funcionalidad | `feat/game-logic` |
| `fix/` | Para corregir un error o bug | `fix/score-counter` |
| `style/` | Solo cambios de CSS o estilos visuales | `style/button-hover` |
| `refactor/` | Mejorar código sin cambiar funcionalidad | `refactor/player-logic` |
| `docs/` | Solo cambios en documentación | `docs/readme-update` |
| `chore/` | Tareas de mantenimiento o configuración | `chore/gitignore` |

> 💡 El nombre debe ser corto y descriptivo, en inglés y con guiones. Ejemplo: `feat/result-modal`

---

## 🚀 Flujo de trabajo paso a paso

### 1️⃣ Abre tu proyecto en VS Code

```bash
code .
```

---

### 2️⃣ Verifica en qué rama estás


git branch
```bash
# Antes de empezar una tarea nueva
git checkout develop
git pull origin develop
git checkout -b feat/nombre-de-tu-tarea

# Guardar y subir tu trabajo
git status
git add .
git commit -m "feat: descripción de lo que hiciste"
git push origin feat/nombre-de-tu-tarea

# → Ir a GitHub, abrir el Pull Request y mover la tarjeta a "In review"
```

---
La rama con `*` es en la que estás. Debe ser la tuya.

---

### 3️⃣ Crea tu rama a partir de `develop`

Antes de empezar una tarea, crea tu rama desde `develop` para no quedarte desfasada:

```bash
git checkout develop
git pull origin develop
git checkout -b feat/nombre-de-tu-tarea
```

> 💡 Esto te asegura que empiezas con el código más actualizado.

---

### 4️⃣ Trabaja en tus archivos

Ahora sí puedes editar, crear o modificar archivos en VS Code con tranquilidad.

---

### 5️⃣ Guarda tus cambios con Git

**Paso A — Ver qué archivos cambiaste:**

```bash
git status
```

**Paso B — Agregar los archivos:**

```bash
git add .
```

**Paso C — Hacer el commit:**

```bash
git commit -m "descripción breve de lo que hiciste"
```

> ✏️ Ejemplos de buenos mensajes:
>
> - `"feat: agrego lógica del juego"`
> - `"fix: corrijo el contador de puntos"`
> - `"style: añado estilos al botón de reinicio"`

---

### 6️⃣ Sube tu rama a GitHub

```bash
git push origin feat/nombre-de-tu-tarea
```

---

### 7️⃣ Crea un Pull Request en GitHub

1. Ve al repositorio: [github.com/Adriasu09/rock-paper-scissors](https://github.com/Adriasu09/rock-paper-scissors)
2. Verás un banner amarillo **"Compare & pull request"** → haz clic
3. Comprueba que la configuración sea:
   - **base:** `develop` ← hacia donde va tu código
   - **compare:** `feat/nombre-de-tu-tarea` ← tu rama
4. Escribe un **título claro** describiendo qué hiciste
5. En la descripción explica brevemente los cambios
6. Vincula la issue que resuelve (ver sección de Projects más abajo ⬇️)
7. Haz clic en **"Create pull request"** ✅

> ⏳ Adriana revisará tu PR y puede dejarte comentarios. Si eso pasa, no te preocupes — ¡es parte del proceso!

---

### 8️⃣ Si te piden hacer cambios en el PR

1. Vuelve a VS Code
2. Asegúrate de estar en tu rama: `git checkout feat/nombre-de-tu-tarea`
3. Haz los cambios pedidos
4. Repite el paso 5 y 6 (add → commit → push)
5. El PR se actualizará automáticamente en GitHub 🔄

---

## 🗂️ GitHub Projects — Gestión de tareas

Usamos un **tablero Kanban** en GitHub Projects para organizar el trabajo de todo el equipo. Así todas sabemos en qué está trabajando cada una y qué queda por hacer.

### 🔗 Acceso al tablero

Ve a la pestaña **Projects** del repositorio o accede directamente desde tu perfil de GitHub en la sección Projects.

---

### 📌 ¿Qué significa cada columna?

| Columna | Significado |
|---------|------------|
| **Backlog** | Tareas pendientes que aún no se han empezado |
| **In progress** | Tareas en las que estás trabajando ahora mismo |
| **In review** | Tu PR está abierto y esperando revisión |
| **Ready** | El PR fue aprobado, listo para hacer merge |
| **Done** | Tarea completada y mergeada en `develop` ✅ |

---

### 🆕 Cómo crear una issue (tarea)

Cualquiera del equipo puede crear issues, especialmente si quieres dividir una tarea grande en subtareas más pequeñas.

1. Ve a la pestaña **Issues** del repositorio
2. Haz clic en **"New issue"**
3. Escribe un **título claro** (ej: `Crear pantalla de resultado`)
4. En la descripción explica qué hay que hacer (puedes usar checkboxes con `- [ ]`)
5. A la derecha, asígnate la issue en **"Assignees"** → haz clic y selecciónate
6. También puedes añadir una etiqueta en **"Labels"** (ej: `enhancement`, `bug`, `documentation`)
7. Haz clic en **"Submit new issue"** ✅

> 💡 **Ejemplo de descripción con subtareas:**
> ```
> ## Descripción
> Crear la pantalla que muestra si el jugador ganó, perdió o empató.
>
> ## Subtareas
> - [ ] Crear el HTML del modal de resultado
> - [ ] Añadir estilos CSS al modal
> - [ ] Conectar el resultado con la lógica del juego
> ```

---

### ➕ Cómo añadir una issue al tablero Projects

Después de crear la issue:

1. Dentro de la issue, busca el panel derecho y haz clic en **"Projects"**
2. Selecciona el proyecto **rock-paper-scissors**
3. La issue aparecerá automáticamente en la columna **Backlog**

---

### 🔄 Cómo mover tarjetas en el tablero

El tablero refleja el estado real de tu trabajo. Mueve las tarjetas así:

| Cuándo | Qué hacer |
|--------|-----------|
| Vas a empezar a trabajar en una tarea | Muévela de **Backlog** → **In progress** |
| Abres el Pull Request | Muévela de **In progress** → **In review** |
| El PR es aprobado | Muévela de **In review** → **Ready** |
| Se hace merge del PR | Muévela a **Done** |

> 💡 Para mover una tarjeta: haz clic en los **tres puntos `...`** de la tarjeta y selecciona el nuevo estado, o arrástrala directamente a la columna correcta.

---

### 🔗 Vincular una issue a tu Pull Request

Cuando abras tu PR, es importante vincularlo a la issue que resuelve. Esto cierra la issue automáticamente cuando se hace merge.

En la descripción del PR escribe:

```
Closes #número-de-la-issue
```

> 💡 Ejemplo: si tu issue es la número 3, escribe `Closes #3`

---

## ❓ Errores comunes de Git

**"You are not on the right branch"**
→ Usa `git checkout feat/nombre-de-tu-rama` para cambiarte.

**"Please commit your changes or stash them before you merge"**
→ Tienes cambios sin guardar. Haz `git add .` y `git commit -m "mensaje"` primero.

**"Rejected — non-fast-forward"**
→ Alguien hizo cambios antes. Corre `git pull origin feat/nombre-de-tu-rama` primero y vuelve a intentar el push.

---

## 💬 Resumen rápido

```bash
# Antes de empezar una tarea nueva
git checkout develop
git pull origin develop
git checkout -b feat/nombre-de-tu-tarea

# Guardar y subir tu trabajo
git status
git add .
git commit -m "feat: descripción de lo que hiciste"
git push origin feat/nombre-de-tu-tarea

# → Ir a GitHub, abrir el Pull Request y mover la tarjeta a "In review"
```

---

> 🙌 Cualquier duda, pregúntale a Adriana antes de hacer algo que no estés segura. ¡Es mejor preguntar que romper el código!