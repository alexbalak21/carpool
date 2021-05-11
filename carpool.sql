-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 11, 2021 at 07:38 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carpool`
--

-- --------------------------------------------------------

--
-- Table structure for table `trips`
--

CREATE TABLE `trips` (
  `id` int(6) UNSIGNED NOT NULL,
  `driver_id` int(11) NOT NULL,
  `departure` varchar(50) NOT NULL,
  `arrival` varchar(50) NOT NULL,
  `price_per_passanger` int(11) DEFAULT NULL,
  `avalable_places` int(11) NOT NULL,
  `passanger_1_id` int(11) DEFAULT NULL,
  `passanger_2_id` int(11) DEFAULT NULL,
  `passanger_3_id` int(11) DEFAULT NULL,
  `passanger_4_id` int(11) DEFAULT NULL,
  `passanger_5_id` int(11) DEFAULT NULL,
  `departure_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(6) UNSIGNED NOT NULL,
  `email` varchar(50) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `img` varchar(255) NOT NULL DEFAULT 'profile.png',
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `firstname`, `lastname`, `password`, `phone`, `img`, `reg_date`) VALUES
(1, 'lara.croft@email.com', 'Lara', 'Croft', 'Azerty123', '06.88.55.47.88', 'profile.png', '2021-05-10 18:17:44'),
(3, 'mara.croft@email.com', 'Lara', 'Croft', 'Azerty123', '06.85.55.47.88', 'profile.png', '2021-05-10 18:35:39'),
(4, 'dara.croft@email.com', 'Lara', 'Croft', 'Azerty123', '07.85.55.47.88', 'profile.png', '2021-05-10 18:39:55'),
(5, 'john.doe@email.com', 'John', 'Doe', 'azerty', '07.00.00.00.00', 'profile.png', '2021-05-10 19:26:18'),
(6, 'alex.doe@email.com', 'Alex', 'Balak', 'azerty', '07.08.00.00.00', 'profile.png', '2021-05-10 19:45:13'),
(7, 'john.wick@email.com', 'John', 'Wick', 'azerty', '07.10.20.00.00', 'profile.png', '2021-05-10 19:49:29'),
(8, 'wohn.doe@email.com', 'Wohn', 'Doe', 'azerty', '67.00.00.00.00', 'profile.png', '2021-05-10 19:50:42'),
(9, 'woh.doe@email.com', 'Wohn', 'Doe', 'azerty', '67.0.00.00.00', 'profile.png', '2021-05-10 19:51:48'),
(10, 'woh.doe@emil.com', 'Wohn', 'Doe', 'azerty', '67.0.00.00.0', 'profile.png', '2021-05-10 19:53:37'),
(11, 'john.doe@eail.com', 'John', 'Doe', 'azerty', '07.00.00.0.00', 'profile.png', '2021-05-10 19:56:45'),
(12, 'woh.do@emil.com', 'Wohn', 'Doe', 'azerty', '67.0.00.00.', 'profile.png', '2021-05-10 19:58:11'),
(13, 'john.doe@el.com', 'John', 'Doe', 'azerty', '07.00.00.00.', 'profile.png', '2021-05-10 19:59:32'),
(14, 'john.de@email.com', 'John', 'Doe', 'azerty', '07.000.00.00', 'profile.png', '2021-05-10 20:00:00'),
(15, 'john.doe@eaail.com', 'John', 'Doe', 'azerty', '07.00.00.00.99', 'profile.png', '2021-05-10 20:01:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `trips`
--
ALTER TABLE `trips`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
