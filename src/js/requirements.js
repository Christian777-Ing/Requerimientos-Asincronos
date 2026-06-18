"use strict";

const getSalesCoffee = async (url) => {
    try {
        let resultados = await fetch(url);

        if (!resultados.ok) {
            throw new Error(`Error HTTP: ${resultados.status}`); 
        }
        let texto = await resultados.text(); 
        
        let parse = new DOMParser();
        let datos = parse.parseFromString(texto, "application/xml"); 

        return {
            success: true,
            body: datos
        };
    } catch (error) {
        return {
            success: false,
            body: error.message
        };
    }
};