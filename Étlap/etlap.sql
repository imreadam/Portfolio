-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2020. Ápr 05. 10:55
-- Kiszolgáló verziója: 10.1.25-MariaDB
-- PHP verzió: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `etterem`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `etlap`
--

CREATE TABLE `etlap` (
  `neve` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `energia` int(11) NOT NULL,
  `szenh` double NOT NULL,
  `ara` int(11) NOT NULL,
  `kategoria` varchar(10) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `etlap`
--

INSERT INTO `etlap` (`neve`, `energia`, `szenh`, `ara`, `kategoria`) VALUES
('Almaleves', 130, 9, 550, 'L'),
('Fehérboros gombakrémleves', 120, 4, 550, 'L'),
('Fokhagymakrémleves', 360, 8, 550, 'L'),
('Gyümölcsleves', 120, 14, 550, 'L'),
('Málnakrémleves', 90, 6, 550, 'L'),
('Paradicsomleves', 310, 9, 600, 'L'),
('Póréhagyma krémleves', 360, 8, 550, 'L'),
('Szederkrémleves', 110, 5, 550, 'L'),
('Szilvaleves', 110, 12, 550, 'L'),
('Tárkonyos csirkeraguleves', 290, 9, 600, 'L'),
('Kapros tökfőzelék vagdalttal', 440, 23, 880, 'F'),
('Parajfőzelék vagdalttal', 520, 7, 920, 'F'),
('Rántott csirkemell meggymártással', 490, 13, 1040, 'F'),
('Sóskafőzelék tükörtojással', 290, 6, 840, 'F'),
('Zöldbabfőzelék rántott csirkemellel', 670, 22, 970, 'F'),
('Zöldborsófőzelék töltött csirkemellel', 720, 24, 920, 'F'),
('Cordon Bleu csirkemell spárgapürével', 700, 12, 1210, 'F'),
('Csirkepaprikás galuskával', 520, 8, 1210, 'F'),
('Fehérboros csirkemell paradicsomsalátával', 410, 10, 1210, 'F'),
('Gombás-tejszínes pulykamellszelet galuskával', 470, 17, 970, 'F'),
('Joghurtos csirkecomb galuskával', 600, 9, 1040, 'F'),
('Májjal töltött rántott pulykamell salátával', 490, 12, 1090, 'F'),
('Mézes-mustáros csirkecomb párolt karfiollal', 510, 13, 970, 'F'),
('Pirított pulykamell sopszka salátával', 350, 9, 1210, 'F'),
('Pulykaragu pitában zöldsalátával és joghurtos önte', 380, 7, 980, 'F'),
('Rántott csirkemell franciasalátával', 570, 18, 1160, 'F'),
('Rántott csirkemell grillezett zöldségekkel', 450, 15, 1090, 'F'),
('Rántott sajt salátával', 570, 13, 1040, 'F'),
('Sült csirkecomb tejszínes gombamártással', 590, 5, 970, 'F'),
('Sült csirkemell tojásos zöldsalátával', 440, 5, 1080, 'F'),
('Sült csirkemellcsíkok almás salátával', 470, 14, 1080, 'F'),
('Sült pulykacomb mozzarellás sült zöldségekkel', 550, 18, 1160, 'F'),
('Vadas pulykatokány spagettivel', 500, 12, 1040, 'F'),
('Vajban sült csirkemell paradicsomos gombasalátával', 310, 9, 1210, 'F'),
('Csőben sült brokkoli sajttal', 340, 10, 1210, 'F'),
('Rakott karalábé (pulykacombból)', 500, 25, 1040, 'F'),
('Rakott sajtos patisszon', 590, 25, 1000, 'F'),
('Rántott cukkini almás sajtsalátával', 560, 30, 1000, 'F'),
('Székelykáposzta (pulykacombból)', 390, 15, 1210, 'F'),
('Tojásos lecsó virslivel és galuskával', 630, 8, 1000, 'F'),
('Töltött padlizsán tejfölös zöldmártással', 470, 21, 1000, 'F'),
('Csirkés pizza', 930, 14, 1470, 'F'),
('Juhtúrós sztrapacska', 790, 8, 1040, 'F'),
('Milánói spagetti', 470, 14, 1090, 'F'),
('Mustáros szűzpecsenye spagettivel', 470, 12, 1210, 'F'),
('Négysajtos pizza', 770, 11, 1210, 'F'),
('Sajtos-sonkás pizza', 780, 10, 1210, 'F'),
('Almás-fahéjas palacsinta vaníliaöntettel', 130, 9, 470, 'D'),
('Barackos lepény', 190, 6, 480, 'D'),
('Császármorzsa', 330, 14, 550, 'D'),
('Cseresznyés pite', 220, 10, 480, 'D'),
('Máglyarakás', 310, 11, 550, 'D'),
('Meggyes piskóta', 330, 18, 480, 'D'),
('Somlói galuska', 380, 9, 470, 'D'),
('Szilvás lepény', 340, 20, 480, 'D'),
('Túrógombóc fahéjas öntettel', 440, 11, 600, 'D'),
('Túrós palacsinta eperöntettel', 240, 9, 480, 'D');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
