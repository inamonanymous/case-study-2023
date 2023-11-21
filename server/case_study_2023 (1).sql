-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2023 at 08:39 PM
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
  `time_quota` datetime DEFAULT NULL,
  `is_claimed` tinyint(1) NOT NULL,
  `is_returned` tinyint(1) DEFAULT NULL,
  `penalty` tinyint(1) NOT NULL DEFAULT 0,
  `pending_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `borrowed`
--

INSERT INTO `borrowed` (`borrow_id`, `time_quota`, `is_claimed`, `is_returned`, `penalty`, `pending_id`) VALUES
(57, '2023-11-22 00:08:28', 1, 0, 1, 77);

-- --------------------------------------------------------

--
-- Table structure for table `completed`
--

CREATE TABLE `completed` (
  `completed_id` int(11) NOT NULL,
  `student_number` varchar(20) NOT NULL,
  `student_department` varchar(45) NOT NULL,
  `student_name` varchar(100) NOT NULL,
  `equip_type` varchar(50) NOT NULL,
  `equip_unique_key` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `completed`
--

INSERT INTO `completed` (`completed_id`, `student_number`, `student_department`, `student_name`, `equip_type`, `equip_unique_key`) VALUES
(1, 'AY-2021-00999', 'IT', 'pacana, rv', 'badminton', 'nikjhgasdf'),
(2, 'AY-2021-00314', 'CS', 'example, example', 'tennis', 'oafneuqfjsa'),
(3, 'fhadsjfhbasdjfhbhiwa', 'CS', 'Aguilar Ganjaman, Joaquin Pogi', 'basketball', 'anjishije'),
(5, 'qqq', 'q', 'q, q', 'badminton', 'nikjhgasdf'),
(6, 'AY2021-00752', 'IT', 'Aguilar, Stephen ', 'basketball', 'anjishije'),
(7, 'AY-2021-00813', 'PYSCH', 'logy, psycho', 'basketball', 'anjishije'),
(8, 'ksdhf', 'knasdf', 'skjdfnas, asknfdjn', 'badminton', 'nikjhgasdf'),
(9, 'aa', 'aa', 'aa, aa', 'volleyball', 'ghyuewoa'),
(10, 'aaaasdafadsf', 'aa', 'aa, aa', 'basketball', 'anjishije'),
(11, 'asdasd', 'asdasd', 'dasdasd, dasdasd', 'basketball', 'anjishije'),
(12, 'Hannah', '', ', ', 'volleyball', 'ghyuewoa'),
(13, 'asdasd', 'dasda', 'dd, dsas', 'badminton', 'nikjhgasdf'),
(14, 'sajdnu', 'fjsdihg', 'psoidfu, spoiyfu', 'basketball', 'anjishije'),
(15, 'lasdfn', ';sldkjf', 'sdiljfh, sofhu', 'tennis', 'oafneuqfjsa'),
(16, 'exampleunique', '', ', ', 'volleyball', 'ghyuewoa'),
(17, 'AY2021-00752', '', ', ', 'basketball', 'anjishije'),
(18, 'AY2021-00123', 'IT', 'Rose, Derrick ', 'badminton', 'nikjhgasdf'),
(19, 'sdkflmsdlkfq', 'mfsdklmsdlk', 'asdfdsaf, asdadsf', 'volleyball', 'ghyuewoa'),
(20, 'AY2021-00752', 'IT', 'Aguilar, Stephen', 'basketball', 'anjishije'),
(21, 'AY2021-0052`', 'Testing', 'Testing, Testting', 'badminton', 'nikjhgasdf'),
(22, 'AY2021-00752', 'BSCS', 'Aguilar, Stephen', 'basketball', 'anjishije'),
(24, 'AY2021-00752', 'IT', 'Aguilar, Stephen', 'tennis', 'oafneuqfjsa'),
(25, 'q', 'q', 'q, q', 'basketball', 'anjishije'),
(26, '12321q', '12eqwe', 'wqe123qw, qwe123', 'tennis', 'oafneuqfjsa'),
(27, 'q11', 'q', 'q, q', 'volleyball', 'ghyuewoa'),
(28, 'wqe', 'qsd', 'sdfgq, asd', 'badminton', 'nikjhgasdf'),
(29, 'idhgihl', 'wqeqwe', 'sdqwe, qweqwe', 'table tennis', 'c[xOs|F.3\"`}\''),
(30, 'AY2021-00752', 'BSCS', 'Aguilar, Stephen', 'basketball', 'anjishije'),
(31, 'AY2021-00752', 'BSCS', 'Aguilar, Stephen', 'basketball', 'anjishije'),
(32, 'AY2021-00752', 'IT', 'Aguilar, Stephen', 'basketball', '10743924aksdjh'),
(33, 'asdasd', 'saadas', 'asdasdsa, sadasdsa', 'basketball', '2tQn1zm4vqcXo'),
(34, 'asdasdas', 'dasdassd', 'dasdasd, dasdasdas', 'basketball', '10743924aksdjh'),
(35, 'AY2021-00753', 'BSCS', 'Aguilar, Stephen', 'basketball', '10743924aksdjh'),
(36, 'AY2021-00752', 'IT', 'Aguilar, Stephen', 'basketball', '10743924aksdjh'),
(37, 'AY2021-00711', 'BSCS', 'Diane, Lady', 'Basketball', 'y5bsku9sYeCF1'),
(38, 'AY2021-00755', 'BSIT', 'Aguilar, Stephen', 'basketball', '2tQn1zm4vqcXo'),
(39, 'AY2021-00752', 'BSCS', 'Aguilar, Stephen', 'basketball', '10743924aksdjh'),
(40, 'AY2021-00752', 'BSCS', 'Aguilar, Stephen', 'basketball', '10743924aksdjh'),
(41, 'AY2021-00965', 'Computer Science', 'Diane, Lady', 'tennis', 'oafneuqfjsa'),
(42, 'AY2021-00752', 'Information Technology', 'Aguilar, Stephen Joaquin', 'basketball', '10743924aksdjh'),
(43, 'AY2021-00752', 'BSCS', 'Aguilar, Stephen', 'basketball', '10743924aksdjh'),
(44, 'AY2021-00752', 'Information Technology', 'Aguilar, Stephen Joaquin', 'tennis', 'oafneuqfjsa');

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
(4, 'volleyball', 'ghyuewoa', 1, 0),
(5, 'tennis', 'oafneuqfjsa', 1, 0),
(7, 'basketball', '10743924aksdjh', 0, 0),
(10, 'tennis', '7IQnz5xK0fmjU', 1, 0),
(11, 'basketball', '2tQn1zm4vqcXo', 1, 0),
(12, 'Hello', 'URRkWQiW6soNW', 1, 0),
(13, 'Basketball', 'y5bsku9sYeCF1', 1, 0);

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
(77, 'basketball', '10743924aksdjh', 'AY2021-Example', 'Your Lastname, Your Firstname', 1);

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
(62, 'AY2021-Example', 'yoursectio', 'Your Department', 'Your Level', 'youremail@gmail.com', 'Your Firstname', 'Your Lastname', '10743924aksdjh', 'claimed');

-- --------------------------------------------------------

--
-- Table structure for table `violators`
--

CREATE TABLE `violators` (
  `violator_id` int(11) NOT NULL,
  `borrow_id` int(11) NOT NULL,
  `student_number` varchar(20) NOT NULL,
  `equip_unique_key` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `violators`
--

INSERT INTO `violators` (`violator_id`, `borrow_id`, `student_number`, `equip_unique_key`) VALUES
(5, 47, 'AY2021-00753', '10743924aksdjh'),
(6, 57, 'AY2021-Example', '10743924aksdjh');

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
-- Indexes for table `completed`
--
ALTER TABLE `completed`
  ADD PRIMARY KEY (`completed_id`);

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
-- Indexes for table `violators`
--
ALTER TABLE `violators`
  ADD PRIMARY KEY (`violator_id`);

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
  MODIFY `borrow_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `completed`
--
ALTER TABLE `completed`
  MODIFY `completed_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `equip_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `pending`
--
ALTER TABLE `pending`
  MODIFY `pending_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `violators`
--
ALTER TABLE `violators`
  MODIFY `violator_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
