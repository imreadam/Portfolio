using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utasszallitok
{
    class Repulo
    {
        public string Tipus { get; set; }
        public int Ev { get; set; }
        public string Utaskapacitas { get; set; }
        public string Szemelyzet { get; set; }
        public int Utazosebesseg { get; set; }
        public int FelszallotoTomeg { get; set; }
        public double Fesztav { get; set; }
        public string SebessegKategoria { get; set; }

        public Repulo(string sor)
        {
            string[] elemek = sor.Split(';');
            this.Tipus = elemek[0];
            this.Ev = Convert.ToInt32(elemek[1]);
            this.Utaskapacitas = elemek[2];
            this.Szemelyzet = elemek[3];
            this.Utazosebesseg = Convert.ToInt32(elemek[4]);
            this.FelszallotoTomeg = Convert.ToInt32(elemek[5]);
            this.Fesztav = Convert.ToDouble(elemek[6]);
            this.SebessegKategoria = KategorizalSebesseg(this.Utazosebesseg);
        }

        private string KategorizalSebesseg(int utazosebesseg)
        {
            return utazosebesseg < 500 ? "Alacsony sebességű" :
                   utazosebesseg < 1000 ? "Szubszonikus" :
                   utazosebesseg < 1200 ? "Transzszonikus" :
                   "Szuperszonikus";
        }

        public string Kimenet() =>
        $"{Tipus};{Ev};{UtasokSzama(Utaskapacitas)};{Szemelyzet};" +
        $"{Fesztav:F2};{FelszallotoTomeg};{Utazosebesseg};{SebessegKategoria}";

        public string LegtobbUtasKimenet() =>
        $"\tTípus:{Tipus}\n\tElső felszállás:{Ev}\n\tUtasok száma:{Utaskapacitas}\n\tSzemélyzet:{Szemelyzet}\n\tUtazósebesség:{Utazosebesseg}";

        public int UtasokSzama(string utaskapacitas)
        {
            string[] kapacitasReszek = utaskapacitas.Split('-');
            if (kapacitasReszek.Length == 2 && int.TryParse(kapacitasReszek[1], out int utasok))
            {
                return utasok;
            }
            else
            {
                return -1;
            }
        }

    }
}
