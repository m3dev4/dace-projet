"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  value: number;
  max?: number;
  label: string;
  color?: string;
}

export function GaugeChart({ value, max = 100, label, color }: GaugeChartProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  // Déterminer la couleur basée sur le pourcentage
  const getColor = () => {
    if (color) return color;
    if (percentage < 60) return '#10b981'; // vert
    if (percentage < 75) return '#eab308'; // jaune
    if (percentage < 90) return '#f59e0b'; // orange
    return '#ef4444'; // rouge
  };

  const data = [
    { name: 'Value', value: percentage },
    { name: 'Rest', value: 100 - percentage },
  ];

  const COLORS = [getColor(), '#e4e4e7'];

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center -mt-16">
        <div className={`text-3xl font-bold ${
          percentage < 60 ? 'text-green-600 dark:text-green-400' :
          percentage < 75 ? 'text-yellow-600 dark:text-yellow-400' :
          percentage < 90 ? 'text-orange-600 dark:text-orange-400' :
          'text-red-600 dark:text-red-400'
        }`}>
          {value}%
        </div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          {label}
        </div>
      </div>
    </div>
  );
}
