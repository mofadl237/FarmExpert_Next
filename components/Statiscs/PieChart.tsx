"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "../ui/badge";


interface IProps {
  title: string;
  COLORS:string[]
  data: { name: string; value ?: number }[];
}

export default function PieChartCard({ title, data ,COLORS}: IProps) {
      const Total = data?.reduce((acc, curr) => acc + curr.value!, 0);

  return (
    <div className="w-full">
      <Card className="w-full px-3">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart title={title}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
        <div className="flex justify-center gap-4 mt-4 text-sm">
          {data.map((item,i)=>(
            <div key={item.name} className="flex items-center gap-1">
            <span className={`w-3 h-3 rounded-full inline-block`}
            style={{ backgroundColor: COLORS[i] }}
            ></span>
            {item.name}
          </div>
          ))}
        </div>
        <Badge className="w-full py-3 "
        style={{ backgroundColor: COLORS[2] }}>Total - {title} - {Total}</Badge>
      </Card>
    </div>
  );
}
