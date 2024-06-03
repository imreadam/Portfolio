using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace fifaranglista
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public class adatok
        {
            public string Nev { get; set; }
            public int Helyezes { get; set; }
            public int Valtozas { get; set; }
            public int Pontszam { get; set; }

            public override string ToString()
            {
                return $"{Nev} - {Helyezes} - {Valtozas} - {Pontszam}";
            }

        }

        private List<adatok> csapatok;
        private List<adatok> csapatoksorba;
        public MainWindow()
        {
            InitializeComponent();
            csapatok = new List<adatok>();
            adatokbetoltese();
        }

        private void adatokbetoltese()
        {
            try
            {
                listbox.Items.Clear();
                string elsosor = "Név Helyezes Változás Pontszám";
                listbox.Items.Add(elsosor);
                string[] sorok = File.ReadAllLines("fifa.txt");
                foreach (string sor in sorok)
                {
                    string[] adatok = sor.Split(';');
                    if (adatok.Length == 4)
                    {
                        adatok csapat = new adatok
                        {
                            Nev = adatok[0],
                            Helyezes = int.Parse(adatok[1]),
                            Valtozas = int.Parse(adatok[2]),
                            Pontszam = int.Parse(adatok[3])
                        };
                        csapatok.Add(csapat);
                       
                    }
                }
                csapatoksorba = csapatok.OrderBy(x => x.Helyezes).ToList();

                foreach (var item in csapatoksorba)
                {
                    listbox.Items.Add(item.Nev +" "+item.Helyezes+" " + item.Valtozas+" " +item.Pontszam);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt az állomány olvasása közben: " + ex.Message);
            }
            atlaglabel.Content = $"Átlagpontszám: {KiszamolAtlagPontszam()}";

            adatok legjobbCsapat = null;
            foreach (var csapat in csapatok)
            {
                if (legjobbCsapat == null || csapat.Valtozas > legjobbCsapat.Valtozas)
                {
                    legjobbCsapat = csapat;
                }
            }
            if (legjobbCsapat != null)
            {
                javitocsapat.Content = $"Legjobb csapat: {legjobbCsapat.Nev} \n(Helyezés: {legjobbCsapat.Helyezes}, Pontszám: {legjobbCsapat.Pontszam})";
            }

        }

        private void Keresbutton_Click(object sender, RoutedEventArgs e)
        {
            string keresettCsapat = kerestb.Text;

            bool talalt = false;
            

            foreach (var csapat in csapatok)
            {
                if (csapat.Nev.ToLower().Contains(keresettCsapat.ToLower()))
                {
                    talalt = true;
                    keresetnev.Content = $"A keresett csapat: {csapat.Nev} \n(Helyezés:{csapat.Helyezes}  Pontszám:{csapat.Pontszam})";
                    break;
                }
            }

            if (!talalt)
            {
                MessageBox.Show("A keresett csapat nem található.");
            }
        }
        private double KiszamolAtlagPontszam()
        {
            if (csapatok.Count == 0)
            {
                return 0;
            }

            double osszeg = csapatok.Sum(csapat => csapat.Pontszam);
            return osszeg / csapatok.Count;
        }

        private void Adatrogzites_Click(object sender, RoutedEventArgs e)
        {
            string csapatNev = ujcsapatnevtb.Text;
            int helyezes;
            int valtozas;
            int pontszam;

            if (!int.TryParse(ujcsapathelyezes.Text, out helyezes))
            {
                MessageBox.Show("Hibás helyezés formátum! Kérlek, adj meg egy érvényes számot a helyezéshez.", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            
            if (!int.TryParse(ujcsapatvaltozas.Text, out valtozas))
            {
                MessageBox.Show("Hibás pontszám formátum! Kérlek, adj meg egy érvényes számot a pontszámhoz.", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            if (!int.TryParse(ujcsapatpontszam.Text, out pontszam))
            {
                MessageBox.Show("Hibás pontszám formátum! Kérlek, adj meg egy érvényes számot a pontszámhoz.", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            adatok ujCsapat = new adatok
            {
                Nev = csapatNev,
                Helyezes = helyezes,
                Valtozas = valtozas, 
                Pontszam = pontszam
            };

            csapatok.Add(ujCsapat);
            listbox.Items.Add(ujCsapat);

            
            listbox.Items.Refresh();

            
            using (StreamWriter sw = File.AppendText("fifa.txt"))
            {
                sw.WriteLine($"{ujCsapat.Nev} - {ujCsapat.Helyezes} - {ujCsapat.Valtozas} - {ujCsapat.Pontszam}");
            }

            
            ujcsapatnevtb.Clear();
            ujcsapathelyezes.Clear();
            ujcsapatvaltozas.Clear();
            ujcsapatpontszam.Clear();

            
            MessageBox.Show("Az adatokat sikeresen rögzítettük a fifa.txt-be", "Sikeres rögzítés", MessageBoxButton.OK, MessageBoxImage.Information);
        }
    }
}
