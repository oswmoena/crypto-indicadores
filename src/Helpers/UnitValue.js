export const unitValue = (unidad_medida, valor) => {
    switch (unidad_medida) {
      case "Pesos":
        return `$${valor.toLocaleString('es-CL')}`
      case "Porcentaje":
        return `${valor}%`
      case "Dólar":
        return `USD$${valor.toLocaleString('en-US')}`
      default:
        break;
    }
  }