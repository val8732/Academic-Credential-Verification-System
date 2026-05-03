-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2026 at 05:17 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `academic_credentials`
--

-- --------------------------------------------------------

--
-- Table structure for table `credentials`
--

CREATE TABLE `credentials` (
  `id` varchar(255) NOT NULL,
  `student_name` varchar(255) DEFAULT NULL,
  `institution` varchar(255) DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL,
  `credential_hash` text DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `file_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `credentials`
--

INSERT INTO `credentials` (`id`, `student_name`, `institution`, `course`, `credential_hash`, `issue_date`, `file_url`) VALUES
('000000', 'zayn', 'INTI', 'IT', '0xf5a24b72c458f68fee6a9facfc89b9d02dbe01544d4076792b14b9eb00da505c', '2026-05-03', ''),
('122898732', 'Arokiasamy', 'PBE', 'Finance', '0x787b7b77f17cd1ddefa5f5b2d57382be22cc3a714a06c640e5c8119b4b3814be', '2026-05-03', '1777820288892-canva-gold-dark-blue-modern-elegant-achievement-certificate-EwA7_nSN1Ig.jpg'),
('123368732', 'Anne', 'PBE', 'Finance', '0x787b7b77f17cd1ddefa5f5b2d57382be22cc3a714a06c640e5c8119b4b3814be', '2026-05-03', '1777820053585-canva-gold-dark-blue-modern-elegant-achievement-certificate-EwA7_nSN1Ig.jpg'),
('124318732', 'Bruno', 'Mars', 'Vocals', '0x35f3da020581a3406e948e62f3ab5e89ecccbd85752de96709a1edd1cbed4435', '2026-05-03', ''),
('126518732', 'Rocky', 'PetSchool', 'Vet', '0x787b7b77f17cd1ddefa5f5b2d57382be22cc3a714a06c640e5c8119b4b3814be', '2026-05-03', '1777819460384-canva-gold-dark-blue-modern-elegant-achievement-certificate-EwA7_nSN1Ig.jpg'),
('129008732', 'Vans', 'UOL', 'Law', '0xc15608055ced9257f09568975d6c027f140a14e578b46dbe466fb9582d13e538', '2026-05-03', ''),
('21035283', 'leeroy', '1d', 'dance', '0x787b7b77f17cd1ddefa5f5b2d57382be22cc3a714a06c640e5c8119b4b3814be', '2026-05-03', '1777819391921-canva-gold-dark-blue-modern-elegant-achievement-certificate-EwA7_nSN1Ig.jpg'),
('5678469', 'zayn', 'INTI', 'IT', '0x6ee870818e25fe458103e690a5f3079a2fb34074d970d04b490d3173f95ff004', '2026-05-03', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `credentials`
--
ALTER TABLE `credentials`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
