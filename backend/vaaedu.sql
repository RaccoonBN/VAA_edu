-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 29, 2024 lúc 10:38 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `vaaedu`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dangkyhocphan`
--

CREATE TABLE `dangkyhocphan` (
  `MaDK` varchar(10) NOT NULL,
  `MaSV` varchar(10) NOT NULL,
  `MaHP` varchar(10) NOT NULL,
  `ngaydangky` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hocphan`
--

CREATE TABLE `hocphan` (
  `MaHP` varchar(10) NOT NULL,
  `tenHP` varchar(50) NOT NULL,
  `tinchi` int(10) NOT NULL,
  `giangvien` varchar(50) NOT NULL,
  `phonghoc` varchar(10) NOT NULL,
  `tinhtrang` varchar(10) NOT NULL,
  `siso` int(50) NOT NULL,
  `sisohientai` int(50) NOT NULL,
  `lichhoc` varchar(10) NOT NULL,
  `giobatdaubuoihoc` varchar(10) NOT NULL,
  `gioketthucbuoihoc` varchar(10) NOT NULL,
  `ngaybatdauhocphan` varchar(10) NOT NULL,
  `ngayketthuphan` varchar(10) NOT NULL,
  `hocky` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hocphan`
--

INSERT INTO `hocphan` (`MaHP`, `tenHP`, `tinchi`, `giangvien`, `phonghoc`, `tinhtrang`, `siso`, `sisohientai`, `lichhoc`, `giobatdaubuoihoc`, `gioketthucbuoihoc`, `ngaybatdauhocphan`, `ngayketthuphan`, `hocky`) VALUES
('HP001', 'Lập trình web', 3, 'A', 'G101', 'MỞ', 60, 1, 'Thứ 2', '7:00', '11:00', '1/1/2025', '1/4/2025', 'HK7'),
('HP002', 'Lập trình mạng', 3, 'B', 'G102', 'MỞ', 60, 1, 'Thứ 3', '7:00', '11:00', '1/1/2025', '1/4/2025', 'HK7'),
('HP003', 'CSDL', 3, 'C', 'G301', 'MỞ', 60, 1, 'Thứ 4', '7:00', '11:00', '1/1/2025', '1/4/2025', 'HK7'),
('HP004', 'Quản trị mạng', 3, 'A', 'G609', 'MỞ', 60, 1, 'Thứ 5', '7:00', '11:00', '1/1/2025', '1/4/2025', 'HK7'),
('HP005', 'Trí tuệ nhân tạo', 3, 'A', 'G208', 'MỞ', 60, 1, 'Thứ 6', '7:00', '11:00', '1/1/2025', '1/4/2025', 'HK7');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sinhvien`
--

CREATE TABLE `sinhvien` (
  `MaSV` varchar(10) NOT NULL,
  `HoTen` varchar(100) NOT NULL,
  `NgaySinh` varchar(20) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `TrangThai` varchar(20) NOT NULL,
  `DiaChi` varchar(100) NOT NULL,
  `Avatar` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sinhvien`
--

INSERT INTO `sinhvien` (`MaSV`, `HoTen`, `NgaySinh`, `Email`, `TrangThai`, `DiaChi`, `Avatar`) VALUES
('SV001', 'NGUYỄN VĂN A', '22/2/2004', 'nguyenvana@gmail.com', 'đang học', 'TpHCM', '.jpg'),
('SV002', 'NGUYỄN VĂN B', '21/5/2004', 'nguyenvanb@gmail.com', 'đang học', 'TpHCM', '.jpg'),
('SV003', 'NGUYỄN VĂN C', '11/7/2004', 'nguyenvanc@gmail.com', 'đang học', 'TpHCM', '.jpg'),
('SV004', 'NGUYỄN VĂN D', '5/9/2004', 'nguyenvand@gmail.com', 'đang học', 'TpHCM', '.jpg'),
('SV005', 'NGUYỄN VĂN E', '2/12/2004', 'nguyenvane@gmail.com', 'đang học', 'TpHCM', '.jpg'),
('SV006', 'Lê Thị A', '2/8/2004', 'lethia@gmail.com', 'đang học', 'TpHCM', '.jpg'),
('SV007', 'Lê Thị B', '6/2/2004', 'lethib@gmail.com', 'đang học', 'TpHCM', '.jpg'),
('SV008', 'Lê Thị C', '24/7/2004', 'lethic@gmail.com', 'đang học', 'TpHCM', '.jpg'),
('SV009', 'Lê Thị D', '12/1/2004', 'lethid@gmail.com', 'đang học', 'TpHCM', '.jpg'),
('SV010', 'Lê Thị E', '29/4/2004', 'lethie@gmail.com', 'đang học', 'TpHCM', '.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoangv`
--

CREATE TABLE `taikhoangv` (
  `MaTKGV` varchar(10) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `taikhoangv`
--

INSERT INTO `taikhoangv` (`MaTKGV`, `username`, `password`) VALUES
('TKGV001', 'gv001', 'gv001'),
('TKGV002', 'gv002', 'gv002'),
('TKGV003', 'gv003', 'gv003'),
('TKGV004', 'gv004', 'gv004'),
('TKGV005', 'gv005', 'gv005');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoansv`
--

CREATE TABLE `taikhoansv` (
  `MaTKSV` varchar(10) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `MaSV` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `taikhoansv`
--

INSERT INTO `taikhoansv` (`MaTKSV`, `Email`, `password`, `MaSV`) VALUES
('TKSV001', 'nguyenvana@gmail.com', 'SV001', 'SV001'),
('TKSV002', 'nguyenvanb@gmail.com', 'SV002', 'SV002'),
('TKSV003', 'nguyenvanc@gmail.com', 'SV003', 'SV003'),
('TKSV004', 'nguyenvand@gmail.com', 'SV004', 'SV004'),
('TKSV005', 'nguyenvane@gmail.com', 'SV005', 'SV005'),
('TKSV006', 'lethia@gmail.com', 'SV006', 'SV006'),
('TKSV007', 'lethib@gmail.com', 'SV007', 'SV007'),
('TKSV008', 'lethic@gmail.com', 'SV008', 'SV008'),
('TKSV009', 'lethid@gmail.com', 'SV009', 'SV009'),
('TKSV010', 'lethie@gmail.com', 'SV010', 'SV010');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `dangkyhocphan`
--
ALTER TABLE `dangkyhocphan`
  ADD PRIMARY KEY (`MaDK`),
  ADD KEY `MaSV` (`MaSV`),
  ADD KEY `MaHP` (`MaHP`);

--
-- Chỉ mục cho bảng `hocphan`
--
ALTER TABLE `hocphan`
  ADD PRIMARY KEY (`MaHP`);

--
-- Chỉ mục cho bảng `sinhvien`
--
ALTER TABLE `sinhvien`
  ADD PRIMARY KEY (`MaSV`);

--
-- Chỉ mục cho bảng `taikhoangv`
--
ALTER TABLE `taikhoangv`
  ADD PRIMARY KEY (`MaTKGV`);

--
-- Chỉ mục cho bảng `taikhoansv`
--
ALTER TABLE `taikhoansv`
  ADD PRIMARY KEY (`MaTKSV`),
  ADD KEY `MaSV` (`MaSV`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `dangkyhocphan`
--
ALTER TABLE `dangkyhocphan`
  ADD CONSTRAINT `dangkyhocphan_ibfk_1` FOREIGN KEY (`MaHP`) REFERENCES `hocphan` (`MaHP`),
  ADD CONSTRAINT `fk_MaSV` FOREIGN KEY (`MaSV`) REFERENCES `sinhvien` (`MaSV`);

--
-- Các ràng buộc cho bảng `taikhoansv`
--
ALTER TABLE `taikhoansv`
  ADD CONSTRAINT `taikhoansv_ibfk_1` FOREIGN KEY (`MaSV`) REFERENCES `sinhvien` (`MaSV`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
