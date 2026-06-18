"use strict";

import { getSalesCoffee } from "./requirements.js";

const URL_VENTAS_CAFE = "https://raw.githubusercontent.com/DATA-DAWM/Datos/refs/heads/main/Coffee/Coffe_sales.xml";

const processSalesCoffee = async () => {
    try {
        let resultados = await getSalesCoffee(URL_VENTAS_CAFE);

        if (resultados.success) {
            const tableContainer = document.getElementById("example");

            tableContainer.innerHTML = `
                <thead>
                    <tr>
                        <th class="px-4 py-2">Fecha</th>
                        <th class="px-4 py-2">Hora Completa</th>
                        <th class="px-4 py-2">Hora del Día</th>
                        <th class="px-4 py-2">Café</th>
                        <th class="px-4 py-2">Tipo de Pago</th>
                        <th class="px-4 py-2">Monto</th>
                        <th class="px-4 py-2">Momento del Día</th>
                        <th class="px-4 py-2">Día de la Semana</th>
                        <th class="px-4 py-2">Mes</th>
                        <th class="px-4 py-2">Orden Día</th>
                        <th class="px-4 py-2">Orden Mes</th>
                    </tr>
                </thead>
                <tbody id="sales-tbody"></tbody>
            `;

            const salesXML = resultados.body;
            const sales = salesXML.getElementsByTagName("row");

            const filas = [];

            for (let sale of sales) {

                const date = sale.getElementsByTagName("Date")[0].textContent.trim();
                const time = sale.getElementsByTagName("Time")[0].textContent.trim();
                const hourOfDay = sale.getElementsByTagName("hour_of_day")[0].textContent.trim();
                const coffeeName = sale.getElementsByTagName("coffee_name")[0].textContent.trim();
                const cashType = sale.getElementsByTagName("cash_type")[0].textContent.trim();
                const money = sale.getElementsByTagName("money")[0].textContent.trim();
                const timeOfDay = sale.getElementsByTagName("Time_of_Day")[0].textContent.trim();
                const weekday = sale.getElementsByTagName("Weekday")[0].textContent.trim();
                const monthName = sale.getElementsByTagName("Month_name")[0].textContent.trim();
                const weekdaysort = sale.getElementsByTagName("Weekdaysort")[0].textContent.trim();
                const monthsort = sale.getElementsByTagName("Monthsort")[0].textContent.trim();

                filas.push(`
                    <tr>
                        <td class="border px-4 py-2">${date}</td>
                        <td class="border px-4 py-2">${time}</td>
                        <td class="border px-4 py-2">${hourOfDay}</td>
                        <td class="border px-4 py-2">${coffeeName}</td>
                        <td class="border px-4 py-2">${cashType}</td>
                        <td class="border px-4 py-2">$${money}</td>
                        <td class="border px-4 py-2">${timeOfDay}</td>
                        <td class="border px-4 py-2">${weekday}</td>
                        <td class="border px-4 py-2">${monthName}</td>
                        <td class="border px-4 py-2 text-center">${weekdaysort}</td>
                        <td class="border px-4 py-2 text-center">${monthsort}</td>
                    </tr>
                `);
            }

            document.getElementById("sales-tbody").innerHTML = filas.join("");

            $('#example').DataTable({
                destroy: true, 
                pageLength: 10,
                language: {
                    search: "Buscar:",
                    lengthMenu: "Mostrar _MENU_ registros por página",
                    info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                    infoEmpty: "Mostrando 0 a 0 de 0 registros",
                    infoFiltered: "(filtrado de _MAX_ registros totales)",
                    zeroRecords: "No se encontraron registros coincidentes",
                    paginate: {
                        first: "Primero",
                        last: "Último",
                        next: "Siguiente",
                        previous: "Anterior"
                    }
                }
            });

        } else {
            alert(resultados.body);
        }
    } catch (error) {
        alert(error.message || error);
    }
};

(() => {
    processSalesCoffee();
})();