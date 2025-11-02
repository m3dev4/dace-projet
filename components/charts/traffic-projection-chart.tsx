"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

interface TrafficProjectionChartProps {
  traficActuel: number | null;
  capacite: number | null;
  tauxCroissance?: number; // Pourcentage de croissance annuelle (par défaut 7%)
}

export function TrafficProjectionChart({ 
  traficActuel, 
  capacite, 
  tauxCroissance = 7 
}: TrafficProjectionChartProps) {
  if (!traficActuel || !capacite) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-zinc-500 dark:text-zinc-400">
        Données insuffisantes pour la projection
      </div>
    );
  }

  const capaciteTotal = capacite * 1000; // Convertir en milliers
  const croissance = tauxCroissance / 100;

  // Calculer les projections
  const data = [
    { 
      annee: 'Actuel', 
      'Trafic': traficActuel,
      'Capacité': capaciteTotal,
    },
    { 
      annee: '+1 an', 
      'Trafic': Math.round(traficActuel * (1 + croissance)),
      'Capacité': capaciteTotal,
    },
    { 
      annee: '+3 ans', 
      'Trafic': Math.round(traficActuel * Math.pow(1 + croissance, 3)),
      'Capacité': capaciteTotal,
    },
    { 
      annee: '+5 ans', 
      'Trafic': Math.round(traficActuel * Math.pow(1 + croissance, 5)),
      'Capacité': capaciteTotal,
    },
    { 
      annee: '+10 ans', 
      'Trafic': Math.round(traficActuel * Math.pow(1 + croissance, 10)),
      'Capacité': capaciteTotal,
    },
  ];

  // Trouver quand la capacité sera dépassée
  const anneeSaturation = data.findIndex(d => d.Trafic > d.Capacité);

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis 
            dataKey="annee" 
            tick={{ fill: '#71717a', fontSize: 12 }}
          />
          <YAxis 
            tick={{ fill: '#71717a', fontSize: 12 }}
            label={{ value: 'Passagers (k/an)', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#71717a' } }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e4e4e7',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            formatter={(value: number) => `${value.toLocaleString()}k`}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
            iconType="line"
          />
          <ReferenceLine 
            y={capaciteTotal} 
            stroke="#ef4444" 
            strokeDasharray="3 3"
            label={{ value: 'Capacité max', fill: '#ef4444', fontSize: 11 }}
          />
          <Line 
            type="monotone" 
            dataKey="Trafic" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="Capacité" 
            stroke="#10b981" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#10b981', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {anneeSaturation !== -1 && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 dark:bg-red-950/30 dark:border-red-800">
          <p className="text-sm font-medium text-red-900 dark:text-red-300">
            ⚠️ Alerte Saturation
          </p>
          <p className="mt-1 text-xs text-red-800 dark:text-red-200">
            La capacité sera dépassée {data[anneeSaturation].annee} avec un taux de croissance de {tauxCroissance}%/an
          </p>
        </div>
      )}
      
      <div className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
        Projection basée sur une croissance moyenne de {tauxCroissance}% par an
      </div>
    </div>
  );
}
