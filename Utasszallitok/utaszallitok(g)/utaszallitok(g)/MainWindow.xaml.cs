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

namespace utaszallitok_g_
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Btadatrogzites_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                
                if (string.IsNullOrWhiteSpace(tbtipus.Text) ||
                    string.IsNullOrWhiteSpace(tbev.Text) ||
                    string.IsNullOrWhiteSpace(tbutasok.Text) ||
                    string.IsNullOrWhiteSpace(tbszemelyzet.Text) ||
                    string.IsNullOrWhiteSpace(tbsebesseg.Text) ||
                    string.IsNullOrWhiteSpace(tbfelszallotomeg.Text) ||
                    string.IsNullOrWhiteSpace(tbfeszttav.Text))
                {
                    throw new Exception("Minden mező kitöltése kötelező!");
                }

                
                int ev, szemelyzet, utazosebesseg, felszallotoTomeg;
                double fesztav;

                if (!int.TryParse(tbev.Text, out ev) ||
                    !int.TryParse(tbszemelyzet.Text, out szemelyzet) ||
                    !int.TryParse(tbsebesseg.Text, out utazosebesseg) ||
                    !int.TryParse(tbfelszallotomeg.Text, out felszallotoTomeg) ||
                    !double.TryParse(tbfeszttav.Text, out fesztav))
                {
                    throw new Exception("A számoknak számnak kell lenniük!");
                }

                
                string adatSor = $"{tbtipus.Text};{ev};{tbutasok.Text};{szemelyzet};" +
                    $"{fesztav:F2};{felszallotoTomeg};{utazosebesseg};";

                
                File.AppendAllLines("utasszallitok.txt", new[] { adatSor });

                
                MessageBox.Show("Adatok sikeresen mentve!");
            }
            catch (Exception ex)
            {
                
                MessageBox.Show($"Hiba történt: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
    
}
