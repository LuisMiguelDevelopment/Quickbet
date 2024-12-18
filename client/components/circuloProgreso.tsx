interface ProgressCircleProps {
  porcentaje: number;
  size?: string;
  fontSize: string;
}

const ProgresoCirculo: React.FC<ProgressCircleProps> = ({
  porcentaje,
  size,
  fontSize,
}) => {
  const totalPorcetaje = (porcentaje / 10) * 100;

  const normalizarPorcentaje = Math.min(100, Math.max(0, totalPorcetaje));

  const radio = 50;
  const circunferencia = 2 * Math.PI * radio;

  const desplazamiento =
    circunferencia - (normalizarPorcentaje / 100) * circunferencia;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {/* Círculo de fondo */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx="60"
          cy="60"
          r={radio}
          stroke="#e6e6e6"
          strokeWidth="10"
          fill="transparent"
        />
        {/* Círculo de progreso */}
        <circle
          cx="60"
          cy="60"
          r={radio}
          stroke="#4caf50"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circunferencia}
          strokeDashoffset={desplazamiento}
          style={{
            transition: "stroke-dashoffset 0.3s ease",
          }}
        />
      </svg>

      {/* Texto de porcentaje */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: fontSize,
          fontWeight: "bold",
          color: "#4caf50",
        }}
      >
        {normalizarPorcentaje.toFixed(0)}%
      </div>
    </div>
  );
};

export default ProgresoCirculo;
