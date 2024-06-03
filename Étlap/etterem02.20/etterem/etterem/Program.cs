using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.IO;
using ConsoleTableExt;
using System.Data;

namespace etterem
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //tesztelések
            //GET-Select
            BackendHivas valasz1 = new BackendHivas("http://localhost:3000/etlap");
            //Console.WriteLine(valasz1.szoveg);
            var etlaplista = JsonConvert.DeserializeObject<List<adatsor>>(valasz1.szoveg);
            /*Console.WriteLine("Összes étel adata");
            foreach (var item in etlaplista) Console.WriteLine($"\t{item.neve}");
            ConsoleTableBuilder.From(etlaplista)
                 .WithFormat(ConsoleTableBuilderFormat.Alternative)
                 .ExportAndWriteLine();*/
            //POST-Select
            BackendHivas valasz2=new BackendHivas("http://localhost:3000/kereses","saláta");
            /*Console.WriteLine(valasz2.szoveg);
            var keresettlista = JsonConvert.DeserializeObject<List<adatsor>>(valasz2.szoveg);
            ConsoleTableBuilder.From(keresettlista)
                 .WithFormat(ConsoleTableBuilderFormat.Alternative)
                 .ExportAndWriteLine();*/
            //POST-Insert
            /*BackendHivas valasz3=new BackendHivas("http://localhost:3000/felvitel", "húsleves",100,20,1000,"L");
            Console.WriteLine(valasz3.szoveg);*/
            /*BackendHivas valasz4 = new BackendHivas("http://localhost:3000/modositas", "Túros palacsinta eperöntettel2", 102, 22, 1002, "D", 57);
            Console.WriteLine(valasz4.szoveg);*/
            Console.WriteLine($"1 feladat: Ennyi étel lett tárolva: {etlaplista.Count()}");
            Console.WriteLine("2. feladat: Levesek:");
            //SELECT * FROM etlap WHERE kategoria="L";
            var leveseklista=etlaplista.Where(x=>x.kategoria=="L").ToList();
            foreach (var i in leveseklista) Console.WriteLine($"\t{i.neve,-30}{i.ara}");
            ConsoleTableBuilder.From(leveseklista)
                 .WithFormat(ConsoleTableBuilderFormat.Alternative)
                 .ExportAndWriteLine();
            Console.Write("3. feladat:\nMelyik ételt keresed: ");
            string keresettetel=Console.ReadLine();
            //SELECT neve,ara FROM etlap WHERE neve LIKE "%pulyka%";
            var eredmenykeres = etlaplista
                .Where(x => x.neve.ToLower().Contains(keresettetel.ToLower()) == true)
                .Select(x => x.neve + "(" + x.ara + " Ft)");
            List<string> kimenet = new List<string>();
            foreach (var i in eredmenykeres)
            {
                Console.WriteLine($"\t{i}");
                kimenet.Add(i);
            }
            Console.WriteLine($"\tTalálatok száma:{eredmenykeres.Count()}");
            kimenet.Add($"Találatok száma:{eredmenykeres.Count()}");
            File.WriteAllLines(keresettetel + ".txt",kimenet);
            Console.WriteLine("4. feladat:Kategóriánként az ételek száma");
            //SELECT kategoria,COUNT(id) FROM etlap GROUP BY kategoria ORDER BY `COUNT(id)` DESC
            var kategorialista = etlaplista.GroupBy(x => x.kategoria);
            var rendezett = kategorialista.OrderByDescending(x => x.Count());
            foreach (var item in rendezett) Console.WriteLine($"\t{item.Key}:{item.Count()}");
            Console.WriteLine("5. feladat:Főételek ár szerint csökkenő");
            //SELECT * FROM etlap WHERE kategoria="F" ORDER BY ara DESC,neve;
            var foetelek = etlaplista.Where(x => x.kategoria == "F").OrderByDescending(x => x.ara).ThenBy(x => x.neve).ToList();
            //foreach (var i in foetelek) Console.WriteLine($"{i.neve},{i.energia},{i.szenh},{i.ara}");
            ConsoleTableBuilder.From(foetelek)
                 .WithFormat(ConsoleTableBuilderFormat.Alternative)
                 .ExportAndWriteLine();
            Console.WriteLine(" 6. feladat: összes desszert összege");
            //SELECT SUM(ara) FROM etlap WHERE kategoria="D";
            var desszertek = etlaplista.Where(x => x.kategoria == "D").ToList();
            var osszeg = desszertek.Sum(x => x.ara);
            Console.WriteLine($"Az összes desszertből egy adag elfogyasztása {osszeg} Ft-ba kerülne.");
            Console.WriteLine("7. feladat: kategóriánként az összeg");
            //SELECT kategoria,SUM(ara) FROM etlap GROUP BY kategoria;
            etlaplista.GroupBy(x => x.kategoria, x => x.ara)
                .ToList().ForEach(x => Console.WriteLine($"\t{x.Key} kategória összege: {x.Sum()}"));
            Console.WriteLine("8. feladat: egyes ételkategóriák átlagos energia- és szénhidrát tartalma");
            //SELECT kategoria,AVG(energia),AVG(szenh) FROM etlap GROUP BY kategoria;
            foreach (var i in kategorialista)
            {
                var atlagosenergia = Math.Round(i.Average(x => x.energia),2);
                var atlagosszenhidrat = Math.Round(i.Average(x => x.szenh),2);
                Console.WriteLine($"\tA(z) {i.Key} kategóriában az átlagos energia tartalom: {atlagosenergia} kcal," +
                    $" az átlagos szénhidrát tartalom: {atlagosszenhidrat} g");
            }
            Console.WriteLine(" 9. feladat: kategóriánként az ételek száma");
            //SELECT kategoria,AVG(szenh) FROM etlap GROUP BY kategoria HAVING AVG(szenh)<10;
            etlaplista.GroupBy(x => x.kategoria).OrderBy(x => x.Count())
                .ToList().ForEach(x => Console.WriteLine($"{x.Key} ételek száma: {x.Count()}"));
            Console.WriteLine(" 10. feladat: az ételkategóriák, melyek átlagos szénhidrát tartalma nem haladja meg a 10g-ot");
            foreach (var i in kategorialista)
            {
                var atlagosszenhidrat=Math.Round(i.Average(x=>x.szenh),2);
                if (atlagosszenhidrat < 10) 
                    Console.WriteLine($"A(z) {i.Key} kategóriában az átlagos szénhidrát tartalom: {atlagosszenhidrat} g");
            }
            Console.WriteLine("legtöbb energiát tartalmazó étel");
            adatsor maxenergia = etlaplista.OrderByDescending(x => x.energia).First();
            //Console.WriteLine($"{maxenergia.neve} {maxenergia.energia}");
            foreach (var item in etlaplista)
            {
                if(item.energia == maxenergia.energia)
                {
                    Console.WriteLine($"\t{item.neve} {item.energia}");
                }
            }
            Console.WriteLine("legdrágább étel energiája az összes élelmiszer között");
            adatsor legdragabb = etlaplista.OrderByDescending(x => x.ara).First();
            Console.WriteLine($"\t{legdragabb.neve} {legdragabb.energia}");
            Console.WriteLine("minden kategória legdrágább étele");
            etlaplista.GroupBy(x => x.kategoria, x => x.ara).ToList().ForEach(x => Console.WriteLine($"\t{x.Key} {x.Max()}"));
            Console.WriteLine("az alacsony energia tartalmú ételek, melyek energia értéke kevesebb, mint 300");
            etlaplista.Where(x => x.energia < 300).ToList().ForEach(x => Console.WriteLine($"\t{x.neve} {x.energia}"));
            Console.WriteLine("melyik kategóriában van a legtöbb étel, és hogy ez hány darab ételt jelent");
            etlaplista.GroupBy(x => x.kategoria).OrderBy(x=>x.Key).ToList().ForEach(x => Console.WriteLine($"\t{x.Key} {x.Count()}"));
            Console.WriteLine("melyik az a kategória amelyikben a legtöbb étel van.");
            var kategorialegtobbetel = etlaplista.GroupBy(x => x.kategoria).OrderByDescending(x => x.Count()).First();
            Console.WriteLine($"\t{kategorialegtobbetel.Key} {kategorialegtobbetel.Count()}");
            Console.WriteLine("az összes desszert, árak szerint csökkenő sorrendben rendezve");
            desszertek.OrderByDescending(x => x.ara).ToList().ForEach(x => Console.WriteLine($"{x.neve} {x.ara}"));
            Console.WriteLine("azok az ételek, amelyeknek a szénhidrát tartalma nem haladja meg az energia tartalmát");
            etlaplista.Where(x => x.szenh <= x.energia).ToList().ForEach(x => Console.WriteLine($"\t{x.neve}"));
            Console.WriteLine("egy adott kategóriához tartozó ételek átlagos ára");
            etlaplista.GroupBy(x => x.kategoria, x=> x.ara).ToList().ForEach(x => Console.WriteLine($"\t{x.Key} {x.Average()}"));
            Console.WriteLine("az L kategóriában VAN-e legalább egy étel, amelynek a energia tartalma meghaladja az 50kcal-ot");
            Console.WriteLine(etlaplista.Where(x=>x.kategoria == "L").Any(x=>x.energia>50)?"van" : "nincs");
            Console.WriteLine("VAN-e olyan kategoria amelyikben van legalább 10 étel");
            Console.WriteLine(etlaplista.GroupBy(x=>x.kategoria).Any(x  => x.Count() > 10)? "van":"nincs");
            Console.WriteLine("ételek, amelyeknek a neve tartalmazza a leves szóösszetételt");
            etlaplista.Where(x => x.neve.ToLower().Contains("leves")).ToList().ForEach(x => Console.WriteLine($"\t{x.neve}"));
            Console.WriteLine("ételek, amelyeknek a neve tartalmazza a leves ÉS csirke szóösszetételt");
            etlaplista.Where(x => x.neve.ToLower().Contains("leves") && x.neve.ToLower().Contains("csirke")).ToList().ForEach(x => Console.WriteLine($"\t{x.neve}"));
            Console.WriteLine("ételek, amelyeknek a neve tartalmazza a leves VAGY csirke szóösszetételt");
            etlaplista.Where(x => x.neve.ToLower().Contains("leves") || x.neve.ToLower().Contains("csirke")).ToList().ForEach(x => Console.WriteLine($"\t{x.neve}"));
            Console.WriteLine("összes olyan étel, amelynek az ára 500 forint alatt van, de energia tartalma legalább 200 kcal");
            etlaplista.Where(x => x.ara < 500 && x.energia >= 200).ToList().ForEach(x => Console.WriteLine($"{x.neve} {x.ara} {x.energia}"));
            Console.WriteLine("mely kategóriákban vannak jelen a csike szóösszetételt tartalmazó ételek");
            etlaplista.Where(x => x.neve.ToLower().Contains("csirke")).Select(x=>new {kat=x.kategoria}).Distinct().ToList().ForEach(x => Console.WriteLine($"\t{x.kat}"));
            Console.WriteLine("azok az ételek, amelyek energia tartalma a szénhidrát tartalmának legalább kétszerese");
            etlaplista.Where(x => x.energia >= (x.szenh * 2)).ToList().ForEach(x => Console.WriteLine($"\t{x.neve} {x.szenh}*2<= {x.energia}"));
            Console.WriteLine("azok az ételek, amelyek energia tartalma meghaladja az átlagos energiatartalmat");
            etlaplista.Where(x => x.energia > etlaplista.Average(y => y.energia)).ToList().ForEach(x => Console.WriteLine($"\t{x.neve} {x.energia} > {etlaplista.Average(y => y.energia)}"));
            Console.WriteLine("melyik étel kategóriában van a legtöbb 200 alatti energia tartalmú étel, és ez hány darab ételt jelent");
            var ketszazalatti = etlaplista.Where(x => x.energia < 200).GroupBy(x => x.kategoria).Select(x => new { kat = x.Key, darab = x.Count() }).OrderByDescending(x => x.darab).First();
            Console.WriteLine($"\t{ketszazalatti.kat} {ketszazalatti.darab}");












            Console.WriteLine("kilépéshez nyomj egy billentyűt");
            Console.ReadKey();
        }
    }
}
