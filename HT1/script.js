// Cargar el intérprete de Tau-Prolog
document.addEventListener("DOMContentLoaded", function () {
    session = pl.create(1000); // Crear una sesión con 1000 cláusulas

    const prologCode = `
        padre(mariano, hugo).
        madre(clemencia, hugo).
        padre(juan, estela).
        madre(bertha, estela).

        padre(hugo, brandon).
        padre(hugo, bryan).
        padre(hugo, kenneth).
        madre(estela, brandon).
        madre(estela, bryan).
        madre(estela, kenneth).

        hombre(brandon).
        hombre(hugo).
        hombre(bryan).
        hombre(kenneth).
        mujer(estela).

        hermano(X, Y) :- padre(P, X), padre(P, Y), madre(M, X), madre(M, Y), X \\= Y.
        hijo(X, P) :- padre(P, X); madre(P, X).
        abuelo(X, Y) :- padre(X, P), (padre(P, Y); madre(P, Y)).
        abuela(X, Y) :- madre(X, P), (padre(P, Y); madre(P, Y)).
    `;

    // Consultar el código Prolog en Tau-Prolog
    session.consult(prologCode, function (success) {
        if (!success) {
            document.getElementById("output").innerText = "Error al cargar la base de conocimiento.";
        }
    });
});

// Función para ejecutar consultas
function consultar() {
    let query = document.getElementById("query").value.trim();
    let outputElement = document.getElementById("output");

    if (query === "") {
        outputElement.innerText = "Por favor, ingrese una consulta.";
        return;
    }

    outputElement.innerText = "Procesando...";

    session.query(query, function (success) {
        if (!success) {
            outputElement.innerText = "Consulta inválida.";
            return;
        }

        let results = [];
        
        session.answers(function (answer) {
            if (answer) {
                results.push(pl.format_answer(answer));
            }
        }, 10); // Límite de respuestas (ajustable)

        // Esperar un breve tiempo para capturar respuestas antes de actualizar la salida
        setTimeout(() => {
            outputElement.innerText = results.length > 0 ? "Resultados:\n" + results.join("\n") : "No hay respuestas.";
        }, 100);
    });
}
