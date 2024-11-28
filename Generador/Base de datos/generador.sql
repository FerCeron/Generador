-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-11-2024 a las 18:31:36
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `generador`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especiales`
--

CREATE TABLE `especiales` (
  `id` int(11) NOT NULL,
  `caracter` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especiales`
--

INSERT INTO `especiales` (`id`, `caracter`) VALUES
(1, '!'),
(2, '@'),
(3, '#'),
(4, '$'),
(5, '%'),
(6, '^'),
(7, '&'),
(8, '*'),
(9, '('),
(10, ')');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mayusculas`
--

CREATE TABLE `mayusculas` (
  `id` int(11) NOT NULL,
  `letra` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mayusculas`
--

INSERT INTO `mayusculas` (`id`, `letra`) VALUES
(1, 'A'),
(2, 'B'),
(3, 'C'),
(4, 'D'),
(5, 'E'),
(6, 'F'),
(7, 'G'),
(8, 'H'),
(9, 'I'),
(10, 'J'),
(11, 'K'),
(12, 'L'),
(13, 'M'),
(14, 'N'),
(15, 'O'),
(16, 'P'),
(17, 'Q'),
(18, 'R'),
(19, 'S'),
(20, 'T'),
(21, 'U'),
(22, 'V'),
(23, 'W'),
(24, 'X'),
(25, 'Y'),
(26, 'Z');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `minusculas`
--

CREATE TABLE `minusculas` (
  `id` int(11) NOT NULL,
  `letra` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `minusculas`
--

INSERT INTO `minusculas` (`id`, `letra`) VALUES
(1, 'a'),
(2, 'b'),
(3, 'c'),
(4, 'd'),
(5, 'e'),
(6, 'f'),
(7, 'g'),
(8, 'h'),
(9, 'i'),
(10, 'j'),
(11, 'k'),
(12, 'l'),
(13, 'm'),
(14, 'n'),
(15, 'o'),
(16, 'p'),
(17, 'q'),
(18, 'r'),
(19, 's'),
(20, 't'),
(21, 'u'),
(22, 'v'),
(23, 'w'),
(24, 'x'),
(25, 'y'),
(26, 'z');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `numeros`
--

CREATE TABLE `numeros` (
  `id` int(11) NOT NULL,
  `numero` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `numeros`
--

INSERT INTO `numeros` (`id`, `numero`) VALUES
(1, '0'),
(2, '1'),
(3, '2'),
(4, '3'),
(5, '4'),
(6, '5'),
(7, '6'),
(8, '7'),
(9, '8'),
(10, '9');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_manager`
--

CREATE TABLE `password_manager` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `encrypted_password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `password_manager`
--

INSERT INTO `password_manager` (`id`, `user_id`, `service_name`, `username`, `password`, `encrypted_password`) VALUES
(2, 2, 'Gmail', 'hernandezvargasale19@gmail.com', '$2y$10$dcmVdCyDbPKX9y4Te4CFlOGrUMxIr1xmN0HL9vKrS.pVGnESAT4m2', 'iTwm5oVhizKuR4aKlQKA5Q==::9IAnyuh83tR+j1RQfDhCuQ=='),
(4, 3, 'Facebook', 'Adrián Garcia', '$2y$10$5Kylc3A6XjcjLk/eNaLSzupBFsUyPZ.208TL6SAhCtPTf8DSFaiLm', 'DkNEmVz1Jf51n7Cwf3Myqw==::qWy2z8cbzcn/Kdu89rQZ/A==');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `edad` int(11) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `genero` varchar(10) NOT NULL,
  `longitud` int(11) DEFAULT 12,
  `password` varchar(255) NOT NULL,
  `qr_code` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `correo_verificado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `edad`, `fecha_nacimiento`, `genero`, `longitud`, `password`, `qr_code`, `email`, `correo_verificado`) VALUES
(2, 'Alexandra Hernandez', 22, '2002-01-30', 'femenino', 8, '$2y$10$jOG9gJBuXkh5p/WaMMte8O4Rfn6LmNzKWORCcnac4UoJQIiaaW/v.', 'O3FHNADF', '2210015@upt.edu.mx', 1),
(3, 'Adrian Garcia Cornejo', 21, '2003-05-01', 'masculino', 15, '$2y$10$ppd8mw0GMD1K.XUQTjhyvuyDzg95rsAKqN/yFmnUrnxAQVjrD40ii', '@an9bo(gOhcsx6$', '2210094@upt.edu.mx', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `especiales`
--
ALTER TABLE `especiales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mayusculas`
--
ALTER TABLE `mayusculas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `minusculas`
--
ALTER TABLE `minusculas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `numeros`
--
ALTER TABLE `numeros`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_manager`
--
ALTER TABLE `password_manager`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `especiales`
--
ALTER TABLE `especiales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `mayusculas`
--
ALTER TABLE `mayusculas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `minusculas`
--
ALTER TABLE `minusculas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `numeros`
--
ALTER TABLE `numeros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `password_manager`
--
ALTER TABLE `password_manager`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `password_manager`
--
ALTER TABLE `password_manager`
  ADD CONSTRAINT `password_manager_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
