using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;//JSON adatok kezeléséhez
using System.IO;//fájlkezelés
using System.Net;//hálózati kommunikációhoz

namespace etterem
{
    internal class BackendHivas
    {
        public string szoveg;//a válasz szövegének tárolása


        //Get-es hívás, Select
        public BackendHivas(string backendLink)
        {
            var url = backendLink;//Az API végpont URL-je

            var request = WebRequest.Create(url);//HTTP GET kérés létrehozása
            request.Method = "GET";

            var webResponse = request.GetResponse();//válasz fogadása
            var webStream = webResponse.GetResponseStream();

            var reader = new StreamReader(webStream);//válasz olvasása
            var data = reader.ReadToEnd();
            this.szoveg = data;//válasz szövegének tárolása


        }

        //Post-os hívás Select
        public BackendHivas(string backendLink, string keresendo)
        {
            var url = backendLink;//Az API végpont URL-je

            var request = (HttpWebRequest)WebRequest.Create(url);//HTTP POST kérés létrehozása

            request.Method = "POST";
            request.ContentType = "application/json";//adatok elküldése JSON formátumban

            var data = new { bevitel1 = keresendo };

            //a kovetkezo sorhoz kell a Newtonsoft telepítés
            var json = JsonConvert.SerializeObject(data);


            byte[] byteArray = Encoding.UTF8.GetBytes(json);

            using (Stream requestStream = request.GetRequestStream())
            {
                requestStream.Write(byteArray, 0, byteArray.Length);
            }


            var response = request.GetResponse();

            using (var respStream = response.GetResponseStream())
            using (var reader = new StreamReader(respStream))
            {
                string responseData = reader.ReadToEnd();

                this.szoveg = responseData;
            }


        }

        //Post-os hívás Insert
        public BackendHivas(string backendLink, string bevitel1, int bevitel2, double bevitel3, int bevitel4, string bevitel5)
        {
            var url = backendLink;

            var request = (HttpWebRequest)WebRequest.Create(url);

            request.Method = "POST";
            request.ContentType = "application/json";

            var data = new
            {
                bevitel1 = bevitel1,
                bevitel2 = bevitel2,
                bevitel3 = bevitel3,
                bevitel4 = bevitel4,
                bevitel5 = bevitel5
            };

            //a kovetkezo sorhoz kell a Newtonsoft telepítés

            var json = JsonConvert.SerializeObject(data);

            byte[] byteArray = Encoding.UTF8.GetBytes(json);

            using (Stream requestStream = request.GetRequestStream())
            {
                requestStream.Write(byteArray, 0, byteArray.Length);
            }


            var response = request.GetResponse();

            using (var respStream = response.GetResponseStream())
            using (var reader = new StreamReader(respStream))
            {
                string responseData = reader.ReadToEnd();

                this.szoveg = responseData;
            }


        }
        //Post-os hívás UPDATE
        public BackendHivas(string backendLink, string bevitel1, int bevitel2, double bevitel3, int bevitel4, string bevitel5, int bevitel6)
        {
            var url = backendLink;

            var request = (HttpWebRequest)WebRequest.Create(url);

            request.Method = "POST";
            request.ContentType = "application/json";

            var data = new
            {
                bevitel1 = bevitel1,
                bevitel2 = bevitel2,
                bevitel3 = bevitel3,
                bevitel4 = bevitel4,
                bevitel5 = bevitel5,
                bevitel6 = bevitel6
            };

            //a kovetkezo sorhoz kell a Newtonsoft telepítés

            var json = JsonConvert.SerializeObject(data);

            byte[] byteArray = Encoding.UTF8.GetBytes(json);

            using (Stream requestStream = request.GetRequestStream())
            {
                requestStream.Write(byteArray, 0, byteArray.Length);
            }


            var response = request.GetResponse();

            using (var respStream = response.GetResponseStream())
            using (var reader = new StreamReader(respStream))
            {
                string responseData = reader.ReadToEnd();

                this.szoveg = responseData;
            }


        }
    }
}
