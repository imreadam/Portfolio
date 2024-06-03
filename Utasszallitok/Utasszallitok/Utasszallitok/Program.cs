using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utasszallitok
{
    class Program
    {
        static void Main()
        {
            var repulok = File.ReadAllLines("utasszallitok.txt")
                .Skip(1)
                .Select(line => new Repulo(line))
                .ToList();

            
            Console.WriteLine("4. feladat: Adatsorok száma: " + repulok.Count);
            foreach (var repulo in repulok)
            {
                Console.WriteLine($"{repulo.Tipus};{repulo.Ev};" +
                    $"{(repulo.Utaskapacitas.Contains('-') ? repulo.Utaskapacitas.Split('-')[1] : repulo.Utaskapacitas)};" +
                    $"{repulo.Szemelyzet};{repulo.Fesztav:F2};" +
                    $"{repulo.FelszallotoTomeg};{repulo.Utazosebesseg};" +
                    $"{repulo.SebessegKategoria}");
            }

           
            Console.WriteLine("5. feladat: Boeing típusok száma: " + repulok.Count(repulo => repulo.Tipus.StartsWith("Boeing")));

            
            var legtobbUtasRepulo = repulok.OrderByDescending(repulo => repulo.UtasokSzama(repulo.Utaskapacitas)).First();
            Console.WriteLine("6. feladat: a legtöbb utast szállító repülőgéptípus");
            Console.WriteLine(legtobbUtasRepulo.LegtobbUtasKimenet());

           
            var sebessegKategoriak = repulok.Select(repulo => repulo.SebessegKategoria).Distinct().ToList();
            var hianyzoKategoriak = new List<string> { "Alacsony sebességű", "Szubszonikus", "Transzszonikus", "Szuperszonikus" }
                .Except(sebessegKategoriak).ToList();

            if (hianyzoKategoriak.Count == 0)
            {
                Console.WriteLine("7. feladat: Minden sebességkategóriából van repülőgéptípus.");
            }
            else
            {
                Console.WriteLine($"7. feladat: {string.Join(", ", hianyzoKategoriak)}");
            }

           
            Console.WriteLine("8. feladat: Új állomány készítése");
            var ujAdatok = new List<string> { "típus;év;utas;személyzet;utazósebesség;felszállótömeg;fesztáv" };

            foreach (var repulo in repulok)
            {
                ujAdatok.Add(repulo.Kimenet());
            }

            File.WriteAllLines("utasszallitok_new.txt", ujAdatok);

            Console.WriteLine("Az új állomány elkészült.");

            Console.ReadLine(); 
        }
    }
}
