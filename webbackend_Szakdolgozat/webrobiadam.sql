-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Feb 19. 09:58
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `web_zarodoga`
--
CREATE DATABASE IF NOT EXISTS `web_zarodoga` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `web_zarodoga`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `alfajok`
--

CREATE TABLE `alfajok` (
  `alfajok_id` int(11) NOT NULL,
  `alfajok_nev` varchar(255) NOT NULL,
  `alfajok_faj` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `alfajok`
--

INSERT INTO `alfajok` (`alfajok_id`, `alfajok_nev`, `alfajok_faj`) VALUES
(1, 'Cocker Spániel', 1),
(2, 'Skót lógófülü', 2),
(3, 'Törpe Papagáj', 5),
(4, 'Capibara', 6),
(5, 'Burmese', 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `allatok`
--

CREATE TABLE `allatok` (
  `allatok_id` int(11) NOT NULL,
  `allatok_nev` varchar(255) NOT NULL,
  `allatok_leiras` text NOT NULL,
  `allatok_faj_id` int(11) DEFAULT NULL,
  `allatok_alfaj_id` int(11) DEFAULT NULL,
  `allatok_felhaszid` int(11) NOT NULL,
  `allatok_orokbefogadas` int(11) NOT NULL,
  `allatok_kep` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `allatok`
--

INSERT INTO `allatok` (`allatok_id`, `allatok_nev`, `allatok_leiras`, `allatok_faj_id`, `allatok_alfaj_id`, `allatok_felhaszid`, `allatok_orokbefogadas`, `allatok_kep`) VALUES
(6, 'Pöttöm', 'leiras1', 2, 5, 1, 1, 'kép7.jpg'),
(7, 'Cirmi', 'leiras2', 2, 2, 1, 1, 'kép8.jpg'),
(8, 'Buksi', 'leírás3', 1, 1, 2, 0, 'kép6.jpg'),
(9, 'Ari', 'leírás4', 5, 3, 2, 1, 'kép9.jpg'),
(10, 'Cappy', 'leíras5', 6, 4, 3, 1, 'kép10.jpg'),
(11, 'alma', 'alma', 2, 5, 3, 1, 'photo_1701854796087_photo.jpg'),
(12, 'Cirmi', 'biotch', 1, 1, 2, 1, 'photo_1702019515173_photo.jpg'),
(13, 'Kokigolyó', 'biotch', 1, 1, 4, 1, 'photo_1702022286048_photo.jpg'),
(18, 'Macska', 'biotch', 2, 1, 1, 1, 'photo_1702028085765_photo.jpg'),
(19, 'Kutya', 'biotch', 1, 1, 1, 1, 'photo_1702029666869_photo.jpg'),
(20, 'Mikulás', 'biotch', 5, 1, 3, 1, 'photo_1702285084429_photo.jpg'),
(21, 'Mikuláscocker', 'biotch', 1, 1, 2, 1, 'photo_1702285415592_photo.jpg'),
(22, 'Mikuláscapy', 'biotch', 6, 4, 2, 1, 'photo_1702285459327_photo.jpg'),
(24, 'Teszt', 'Teszt', 1, 1, 1, 1, 'photo_1702286056532_photo.jpg'),
(25, 'Kutyimutyi', 'Leírásneked', 1, 1, 1, 0, 'photo_1704442905302_photo.jpg'),
(26, 'Asd', 'Asd', 5, 3, 3, 0, 'photo_1704886518224_photo.jpg'),
(29, 'Asdd', 'Asdd', 1, 1, 11, 1, 'photo_1706857545173_photo.jpg'),
(31, 'Assdd', 'Assdd', 2, 5, 11, 0, 'photo_1707129739237_photo.jpg'),
(32, 'Teszt2', 'Teszt2', 1, 1, 2, 0, 'photo_1707129835720_photo.jpg'),
(33, 'Gizsgugya', 'Gizsgugya', 1, 1, 11, 0, 'photo_1707130701837_photo.jpg'),
(36, 'Teszt11', 'Teszt11', 1, 1, 11, 0, 'photo_1707295647932_photo.jpg'),
(39, 'Teszt12', 'Teszt12', 1, 1, 11, 0, 'photo_1707295649620_photo.jpg'),
(42, '111', '111', 2, 5, 11, 0, 'photo_1707300739717_photo.jpg'),
(45, 'Teszt132', 'Teszt132', 2, 5, 12, 0, 'photo_1707300865571_photo.jpg'),
(48, '111', '111', 2, 5, 11, 0, 'photo_1707300876897_photo.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `elveszett`
--

CREATE TABLE `elveszett` (
  `elveszett_id` int(11) NOT NULL,
  `elveszett_szoveg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `felhasznalo_indexid` int(11) NOT NULL,
  `elveszett_kep` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `elveszett`
--

INSERT INTO `elveszett` (`elveszett_id`, `elveszett_szoveg`, `felhasznalo_indexid`, `elveszett_kep`) VALUES
(1, 'Elveszett', 2, 'photo_1707129999785_photo.jpg'),
(2, 'Teszt11', 11, 'photo_1707130608466_photo.jpg'),
(3, 'Teszt11', 11, 'photo_1707130615678_photo.jpg'),
(4, 'Teszt111', 11, 'photo_1707130621459_photo.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fajok`
--

CREATE TABLE `fajok` (
  `fajok_id` int(11) NOT NULL,
  `fajok_nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `fajok`
--

INSERT INTO `fajok` (`fajok_id`, `fajok_nev`) VALUES
(1, 'kutya'),
(2, 'macska'),
(5, 'madár'),
(6, 'rágcsáló');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `felhasznalok_id` int(11) NOT NULL,
  `felhasznalo_teljesnev` varchar(255) NOT NULL,
  `felhasznalo_nev` varchar(255) NOT NULL,
  `felhasznalo_jelszo` varchar(255) NOT NULL,
  `felhasznalo_email` varchar(255) NOT NULL,
  `felhasznalo_telefon` varchar(255) NOT NULL,
  `felhasznalok_menhelyid` int(11) DEFAULT NULL,
  `felhasznalo_admin` tinyint(1) NOT NULL,
  `activationCode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`felhasznalok_id`, `felhasznalo_teljesnev`, `felhasznalo_nev`, `felhasznalo_jelszo`, `felhasznalo_email`, `felhasznalo_telefon`, `felhasznalok_menhelyid`, `felhasznalo_admin`, `activationCode`) VALUES
(1, 'Kovács József', 'felhasznaló1', 'jelszó1', 'peldaemail1@freemial.hu', '063077777', NULL, 0, ''),
(2, 'példa név2', 'felhasznalonev2', 'jelszo2', 'peldaemail2@freemail.hu', '0620255555', 4, 0, ''),
(3, 'példa név3', 'felhasznalonev3', 'jelszo3', 'peldaemail3@freemail.hu', '0630444444', 5, 0, ''),
(4, 'példanev4', 'felhasznalone4', 'jelszo4', 'peldaemail4@gmail.com', '062055587', 2, 0, ''),
(5, 'példanév5', 'felhasznalo5', 'jelsz5', 'peldaemail5@freemail.hu', '062047557', 1, 0, ''),
(8, 'nev10', 'felhasznalonev10', 'jelszo10', 'email10', '0620745815', NULL, 0, ''),
(11, 'Kormány Róbert', 'Korrobi', 'Robi2002', 'kormanyrobert@gmail.com', '06305710068', NULL, 0, 'Jchpbucu'),
(12, 'Imre Ádám', 'Edem', 'Kqki12', 'adamimre140@gmail.com', '06307435097', NULL, 0, 'gaAGSlGM');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `film`
--

CREATE TABLE `film` (
  `film_id` int(11) NOT NULL,
  `film_cim` varchar(50) NOT NULL,
  `film_datum` date NOT NULL,
  `film_hossz` int(11) NOT NULL,
  `film_kep` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `film`
--

INSERT INTO `film` (`film_id`, `film_cim`, `film_datum`, `film_hossz`, `film_kep`) VALUES
(1, 'Wandavision', '0000-00-00', 0, '1.png'),
(2, 'Loki', '0000-00-00', 0, '2.png'),
(3, 'Falcon and the winter soldier', '0000-00-00', 0, '3.png');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `menhelyek`
--

CREATE TABLE `menhelyek` (
  `menhelyek_id` int(11) NOT NULL,
  `menhely_nev` varchar(255) NOT NULL,
  `mehely_email` varchar(255) NOT NULL,
  `menhely_telefonszam` varchar(255) NOT NULL,
  `menehely_cim` varchar(255) NOT NULL,
  `menehelyek_telepules` int(11) NOT NULL,
  `menhelyek_kep` varchar(255) NOT NULL,
  `menhely_allatokid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `menhelyek`
--

INSERT INTO `menhelyek` (`menhelyek_id`, `menhely_nev`, `mehely_email`, `menhely_telefonszam`, `menehely_cim`, `menehelyek_telepules`, `menhelyek_kep`, `menhely_allatokid`) VALUES
(1, 'Debrecen kutyaház', 'debrecenikutyahaz@gmail.com', '36204024303', 'Mészáros Gergely kert 0452/2', 6, 'kep1.jpg', 1),
(2, 'Állatbarát alapítvány', ' allatbarat@allatbarat.com', ' 36205501788', 'Csatorna u. 2.', 10, 'kep2.jpg', 1),
(3, 'Állat menhely Cegléd', 'cegled.allatmenhely@gmail.com', '36205661536', '1622/7 hrsz.', 8, 'kep3.jpg', 1),
(4, 'Befogad-Lak Hevesi Állatmenhely Alapítvány', 'hevesi.befogadlak@gmail.com', '36209796099', 'Külterület hrsz.: 0302/156', 7, 'kep4.jpg', 1),
(5, 'Szent Ferenc állatotthon alapítvány', 'merzarita@gmail.com', '36203404274', 'Szent György utca', 9, 'kep5.jpg', 1),
(6, 'alma', 'alma@gmail.com', '0620474747', 'valami', 7, '1.jpg', 1),
(7, 'alma', 'alma@gmail.com', '0620474747', 'valami', 7, '1.jpg', 1),
(8, 'alma', 'alma@gmail.com', '0620474747', 'valami', 7, 'photo_1701858450393_photo.jpg', 1),
(9, 'Mikulás', 'alma@gmail.com', '0620474747', 'valami', 7, 'photo_1701859956276_photo.jpg', 1),
(13, 'Valami', 'Valami', '0620474747', 'valami', 7, 'photo_1702029600938_photo.jpg', 1),
(14, 'Valami', 'Valami', '0620474747', 'valami', 7, 'photo_1702029636886_photo.jpg', 1),
(15, 'Valami', 'Valami', '05699999', 'Valami', 6, 'photo_1702029733668_photo.jpg', 1),
(16, 'Vakami', 'Valami', '06793222321', 'Valami', 6, 'photo_1702284992496_photo.jpg', 1),
(17, 'Vakamiii', 'Valamiii', '06793222321', 'Valami', 6, 'photo_1702285703306_photo.jpg', 1),
(18, 'Vakamiiiii', 'Valamiiiii', '06793222321', 'Valami', 6, 'photo_1702285757142_photo.jpg', 1),
(20, 'Hehe', 'Hehe', '0620232432', 'Hehe', 10, 'photo_1705482561475_photo.jpg', 1),
(21, 'Kisállat menhely', 'Kmenhely@gmail.com', '0620974553', 'Mátészalka Gyergyó u. 14', 7, 'photo_1706857791553_photo.jpg', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orokbefogadas`
--

CREATE TABLE `orokbefogadas` (
  `orokbefogadas_id` int(11) NOT NULL,
  `ofelhasznalo_id` int(11) NOT NULL,
  `orokbefogadas_datum` date NOT NULL,
  `orokbefogadas_allatid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `orokbefogadas`
--

INSERT INTO `orokbefogadas` (`orokbefogadas_id`, `ofelhasznalo_id`, `orokbefogadas_datum`, `orokbefogadas_allatid`) VALUES
(1, 1, '2023-12-11', 11),
(2, 5, '2024-02-13', 13),
(3, 1, '2023-02-06', 19),
(4, 8, '2024-02-05', 20),
(5, 11, '2024-02-14', 29),
(6, 1, '2024-02-05', 11),
(7, 1, '2024-02-05', 29),
(8, 11, '2024-02-05', 29),
(9, 1, '2024-02-05', 11),
(12, 1, '2024-02-05', 11),
(15, 11, '2024-02-05', 29);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'user', '2020-08-02 14:57:31', '2020-08-02 14:57:31'),
(2, 'moderator', '2020-08-02 14:57:31', '2020-08-02 14:57:31'),
(3, 'admin', '2020-08-02 14:57:31', '2020-08-02 14:57:31');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szavazat`
--

CREATE TABLE `szavazat` (
  `szavazat_id` int(11) NOT NULL,
  `szavazat_film` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `szavazat`
--

INSERT INTO `szavazat` (`szavazat_id`, `szavazat_film`) VALUES
(1, 1),
(2, 2),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 2),
(8, 1),
(9, 1),
(10, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `telepulesek`
--

CREATE TABLE `telepulesek` (
  `telepules_id` int(11) NOT NULL,
  `telepules_nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `telepulesek`
--

INSERT INTO `telepulesek` (`telepules_id`, `telepules_nev`) VALUES
(6, 'Debrecen'),
(7, 'Heves'),
(8, 'Cegléd'),
(9, 'Inrács'),
(10, 'Nyíregyháza');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'user', 'user', '$2a$08$gXM4pyuhZFlC72PeAwxrUOR0uA31/d2PdgnHP35JGV.0bQNiZBatS', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'mod', 'mod', '$2a$08$gXM4pyuhZFlC72PeAwxrUOR0uA31/d2PdgnHP35JGV.0bQNiZBatS', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'admin', 'admin', '$2a$08$97Ze1/hXfOX44WdC62Rq8uRkog9HYC1HukRX8eld2ZEKPyenM5v.G', '2020-08-02 15:03:59', '2020-08-02 15:03:59'),
(14, 'valaki', 'valaki@gmail.com', '$2a$08$2I9RHv7Yt6ljopICRKZq9.c/PzU.jDQU2zqtSD16A3kjQjbBuhw1a', '2024-02-06 17:37:10', '2024-02-06 17:37:10');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_roles`
--

CREATE TABLE `user_roles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `user_roles`
--

INSERT INTO `user_roles` (`createdAt`, `updatedAt`, `roleId`, `userId`) VALUES
('0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 1),
('2020-08-02 15:04:00', '2020-08-02 15:04:00', 1, 3),
('2024-02-06 17:37:10', '2024-02-06 17:37:10', 1, 14),
('0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 2),
('0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 3),
('2020-08-02 15:04:00', '2020-08-02 15:04:00', 3, 3);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `alfajok`
--
ALTER TABLE `alfajok`
  ADD PRIMARY KEY (`alfajok_id`),
  ADD KEY `alfajok_faj` (`alfajok_faj`);

--
-- A tábla indexei `allatok`
--
ALTER TABLE `allatok`
  ADD PRIMARY KEY (`allatok_id`),
  ADD KEY `allatok_alfaj` (`allatok_alfaj_id`),
  ADD KEY `allatok_faj` (`allatok_faj_id`),
  ADD KEY `allatok_faj_id` (`allatok_faj_id`,`allatok_alfaj_id`),
  ADD KEY `allatok_felhaszid` (`allatok_felhaszid`);

--
-- A tábla indexei `elveszett`
--
ALTER TABLE `elveszett`
  ADD PRIMARY KEY (`elveszett_id`),
  ADD KEY `allatok_indexid` (`felhasznalo_indexid`);

--
-- A tábla indexei `fajok`
--
ALTER TABLE `fajok`
  ADD PRIMARY KEY (`fajok_id`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`felhasznalok_id`),
  ADD KEY `felhaszmalok_menhekyid` (`felhasznalok_menhelyid`);

--
-- A tábla indexei `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`film_id`);

--
-- A tábla indexei `menhelyek`
--
ALTER TABLE `menhelyek`
  ADD PRIMARY KEY (`menhelyek_id`),
  ADD KEY `menehelyek_telepules` (`menehelyek_telepules`),
  ADD KEY `menhely_allatokid` (`menhely_allatokid`);

--
-- A tábla indexei `orokbefogadas`
--
ALTER TABLE `orokbefogadas`
  ADD PRIMARY KEY (`orokbefogadas_id`),
  ADD KEY `ofelhasznalo_id` (`ofelhasznalo_id`),
  ADD KEY `orokbefogadas_allatid` (`orokbefogadas_allatid`),
  ADD KEY `orokbefogadas_allatid_2` (`orokbefogadas_allatid`);

--
-- A tábla indexei `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `szavazat`
--
ALTER TABLE `szavazat`
  ADD PRIMARY KEY (`szavazat_id`);

--
-- A tábla indexei `telepulesek`
--
ALTER TABLE `telepulesek`
  ADD PRIMARY KEY (`telepules_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`roleId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `alfajok`
--
ALTER TABLE `alfajok`
  MODIFY `alfajok_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `allatok`
--
ALTER TABLE `allatok`
  MODIFY `allatok_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT a táblához `elveszett`
--
ALTER TABLE `elveszett`
  MODIFY `elveszett_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT a táblához `fajok`
--
ALTER TABLE `fajok`
  MODIFY `fajok_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `felhasznalok_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `film`
--
ALTER TABLE `film`
  MODIFY `film_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT a táblához `menhelyek`
--
ALTER TABLE `menhelyek`
  MODIFY `menhelyek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT a táblához `orokbefogadas`
--
ALTER TABLE `orokbefogadas`
  MODIFY `orokbefogadas_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT a táblához `szavazat`
--
ALTER TABLE `szavazat`
  MODIFY `szavazat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `telepulesek`
--
ALTER TABLE `telepulesek`
  MODIFY `telepules_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `alfajok`
--
ALTER TABLE `alfajok`
  ADD CONSTRAINT `alfajok_ibfk_1` FOREIGN KEY (`alfajok_faj`) REFERENCES `fajok` (`fajok_id`);

--
-- Megkötések a táblához `allatok`
--
ALTER TABLE `allatok`
  ADD CONSTRAINT `allatok_ibfk_1` FOREIGN KEY (`allatok_faj_id`) REFERENCES `fajok` (`fajok_id`),
  ADD CONSTRAINT `allatok_ibfk_2` FOREIGN KEY (`allatok_alfaj_id`) REFERENCES `alfajok` (`alfajok_id`),
  ADD CONSTRAINT `allatok_ibfk_3` FOREIGN KEY (`allatok_felhaszid`) REFERENCES `felhasznalok` (`felhasznalok_id`);

--
-- Megkötések a táblához `elveszett`
--
ALTER TABLE `elveszett`
  ADD CONSTRAINT `elveszett_ibfk_3` FOREIGN KEY (`felhasznalo_indexid`) REFERENCES `felhasznalok` (`felhasznalok_id`);

--
-- Megkötések a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD CONSTRAINT `felhasznalok_ibfk_1` FOREIGN KEY (`felhasznalok_menhelyid`) REFERENCES `menhelyek` (`menhelyek_id`);

--
-- Megkötések a táblához `menhelyek`
--
ALTER TABLE `menhelyek`
  ADD CONSTRAINT `menhelyek_ibfk_1` FOREIGN KEY (`menehelyek_telepules`) REFERENCES `telepulesek` (`telepules_id`);

--
-- Megkötések a táblához `orokbefogadas`
--
ALTER TABLE `orokbefogadas`
  ADD CONSTRAINT `orokbefogadas_ibfk_1` FOREIGN KEY (`ofelhasznalo_id`) REFERENCES `felhasznalok` (`felhasznalok_id`),
  ADD CONSTRAINT `orokbefogadas_ibfk_2` FOREIGN KEY (`orokbefogadas_allatid`) REFERENCES `allatok` (`allatok_id`);

--
-- Megkötések a táblához `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
