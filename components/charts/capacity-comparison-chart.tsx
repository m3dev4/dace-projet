"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CapacityComparisonChartProps {
  capacite: number | null;
  traficActuel: number | null;
}

export function CapacityComparisonChart({ capacite, traficActuel }: CapacityComparisonChartProps) {
  if (!capacite || !traficActuel) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-zinc-500 dark:text-zinc-400">
        Données insuffisantes pour afficher le graphique
      </div>
    );
  }

  const data = [
    {
      name: 'Aéroport',
      'Capacité totale': capacite * 1000, // Convertir en milliers
      'Trafic actuel': traficActuel,
      'Capacité restante': (capacite * 1000) - traficActuel,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
        <XAxis type="number" tick={{ fill: '#71717a', fontSize: 12 }} />
        <YAxis type="category" dataKey="name" tick={{ fill: '#71717a', fontSize: 12 }} width={80} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #e4e4e7',
            borderRadius: '8px',
            fontSize: '12px'
          }}
          formatter={(value: number) => `${value.toLocaleString()}k pass./an`}
        />
        <Legend 
          wrapperStyle={{ fontSize: '12px' }}
          iconType="circle"
        />
        <Bar dataKey="Capacité totale" fill="#3b82f6" radius={[0, 4, 4, 0]} />
        <Bar dataKey="Trafic actuel" fill="#f59e0b" radius={[0, 4, 4, 0]} />
        <Bar dataKey="Capacité restante" fill="#10b981" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
