import React from 'react';
import { Calendar as CalendarIcon, TrendingUp } from 'lucide-react';

export const Reports: React.FC = () => {
  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Attendance Card */}
      <div className="bg-cardBg p-4 rounded-custom shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-primary" />
          <span>Iyun Davomati</span>
        </h3>
        <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-medium text-gray-500 mb-2">
          <span>D</span><span>S</span><span>Ch</span><span>P</span><span>J</span><span>Sh</span><span>Y</span>
        </div>
        {/* Simulated Attendance Calendar */}
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {Array.from({ length: 30 }).map((_, i) => {
            const day = i + 1;
            let bg = "bg-gray-50 text-gray-700";
            if (day === 3 || day === 10 || day === 17 || day === 24) bg = "bg-green-100 text-green-800 font-bold";
            if (day === 5 || day === 12) bg = "bg-red-100 text-red-800 font-bold";
            if (day === 19) bg = "bg-yellow-100 text-yellow-800 font-bold";
            return (
              <span key={i} className={`p-1.5 rounded-custom text-xs ${bg}`}>
                {day}
              </span>
            );
          })}
        </div>
        <div className="mt-4 flex justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
          <span className="flex items-center"><span className="w-2.5 h-2.5 bg-green-400 rounded-full mr-1.5"></span>Bor (18 ta)</span>
          <span className="flex items-center"><span className="w-2.5 h-2.5 bg-red-400 rounded-full mr-1.5"></span>Yo'q (2 ta)</span>
          <span className="flex items-center"><span className="w-2.5 h-2.5 bg-yellow-400 rounded-full mr-1.5"></span>Kech (1 ta)</span>
        </div>
      </div>

      {/* Debt & Finance */}
      <div className="bg-cardBg p-4 rounded-custom shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span>To'lov Balansi</span>
        </h3>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600">Iyun oyi kursi to'lovi</span>
          <span className="text-sm font-semibold text-red-600">150 000 so'm (Qarz)</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600">Chegirma</span>
          <span className="text-sm font-semibold text-green-600">- 20 000 so'm</span>
        </div>
        <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Yakuniy hisob</span>
          <span className="text-base font-bold text-gray-800">130 000 so'm</span>
        </div>
      </div>
    </div>
  );
};
