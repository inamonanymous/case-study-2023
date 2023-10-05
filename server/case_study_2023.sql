-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 30, 2023 at 11:03 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `case_study_2023`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `admin_username` varchar(50) NOT NULL,
  `admin_password` varchar(255) NOT NULL,
  `admin_email_address` varchar(45) NOT NULL,
  `admin_firstname` varchar(45) NOT NULL,
  `admin_surname` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `admin_username`, `admin_password`, `admin_email_address`, `admin_firstname`, `admin_surname`) VALUES
(6, 'pogisipanot', 'pbkdf2:sha256:600000$v2INXFPBsE7r4pYB$40df1c4e042a6207d364b86a93be49b753c7a7bd5aa9a7d303956214e7fd7b61', 'hayahay', 'google', 'microsoft'),
(7, 'admin', 'pbkdf2:sha256:600000$Lk24rQPircJ8FLEQ$2f8c282c39bb01544533a8a1468be535c9db3cb0a54e71ed1a2d4393dfbed9ce', 'admin@gmail.com', 'super', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `alembic_version`
--

CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alembic_version`
--

INSERT INTO `alembic_version` (`version_num`) VALUES
('082ab0abf8c9');

-- --------------------------------------------------------

--
-- Table structure for table `borrowed`
--

CREATE TABLE `borrowed` (
  `borrow_id` int(11) NOT NULL,
  `time_quota` time DEFAULT NULL,
  `is_returned` tinyint(1) DEFAULT NULL,
  `pending_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `borrowed`
--

INSERT INTO `borrowed` (`borrow_id`, `time_quota`, `is_returned`, `pending_id`) VALUES
(12, '08:43:24', 0, 7),
(13, '08:43:24', 0, 8);

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `equip_id` int(11) NOT NULL,
  `equip_type` varchar(50) NOT NULL,
  `equip_unique_key` varchar(50) NOT NULL,
  `is_available` tinyint(1) DEFAULT NULL,
  `is_pending` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`equip_id`, `equip_type`, `equip_unique_key`, `is_available`, `is_pending`) VALUES
(2, 'basketball', 'anjishije', 0, 1),
(3, 'badminton', 'nikjhgasdf', 1, 0),
(4, 'volleyball', 'ghyuewoa', 0, 1),
(5, 'tennis', 'oafneuqfjsa', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `pending`
--

CREATE TABLE `pending` (
  `pending_id` int(11) NOT NULL,
  `equip_type` varchar(50) DEFAULT NULL,
  `equip_unique_key` varchar(50) NOT NULL,
  `student_number` varchar(20) NOT NULL,
  `student_name` varchar(50) NOT NULL,
  `is_verified` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pending`
--

INSERT INTO `pending` (`pending_id`, `equip_type`, `equip_unique_key`, `student_number`, `student_name`, `is_verified`) VALUES
(7, 'volleyball', 'ghyuewoa', 'AY-2021-00752', 'Aguilar, Stephen Joaquin', 1),
(8, 'basketball', 'anjishije', 'sampl', 'sample, sample', 1);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `student_number` varchar(20) NOT NULL,
  `student_section` varchar(10) DEFAULT NULL,
  `student_department` varchar(45) NOT NULL,
  `student_year` varchar(10) NOT NULL,
  `student_email_address` varchar(45) NOT NULL,
  `student_firstname` varchar(50) NOT NULL,
  `student_surname` varchar(50) NOT NULL,
  `requested_item` varchar(50) NOT NULL,
  `status` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `student_number`, `student_section`, `student_department`, `student_year`, `student_email_address`, `student_firstname`, `student_surname`, `requested_item`, `status`) VALUES
(11, 'AY-2021-00752', '3a3', 'IT', '3rd', 'stephenonline25@gmail.com', 'Stephen Joaquin', 'Aguilar', 'ghyuewoa', 'to-receive'),
(12, 'sampl', 'sample', 'samp[le', 'sample', 'sample', 'sample', 'sample', 'anjishije', 'to-receive');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `admin_username` (`admin_username`);

--
-- Indexes for table `alembic_version`
--
ALTER TABLE `alembic_version`
  ADD PRIMARY KEY (`version_num`);

--
-- Indexes for table `borrowed`
--
ALTER TABLE `borrowed`
  ADD PRIMARY KEY (`borrow_id`),
  ADD KEY `pending_id` (`pending_id`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`equip_id`),
  ADD UNIQUE KEY `equip_unique_key` (`equip_unique_key`);

--
-- Indexes for table `pending`
--
ALTER TABLE `pending`
  ADD PRIMARY KEY (`pending_id`),
  ADD UNIQUE KEY `student_number` (`student_number`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `student_number` (`student_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `borrowed`
--
ALTER TABLE `borrowed`
  MODIFY `borrow_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `equip_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pending`
--
ALTER TABLE `pending`
  MODIFY `pending_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `borrowed`
--
ALTER TABLE `borrowed`
  ADD CONSTRAINT `borrowed_ibfk_1` FOREIGN KEY (`pending_id`) REFERENCES `pending` (`pending_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;