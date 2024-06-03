using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace etterem
{
    internal class adatsor
    {
        //SELECT `id`,`neve`,`energia`,`szenh`,`ara`,`kategoria` FROM `etlap`
        public int id { get; set; }
        public string neve { get; set; }
        public int energia { get; set; }
        public double szenh { get; set; }
        public int ara { get; set; }
        public string kategoria { get; set; }
    }
}
