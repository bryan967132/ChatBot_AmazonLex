SELECT * FROM province;
SELECT * FROM patient;
SELECT * FROM doctor;
SELECT * FROM admission;

USE hospital;

-- 1. N pacientes con alergias y su último médico tratante
SELECT 
    CONCAT(p.first_name, ' ', p.last_name) AS patient, 
	p.allergies, 
    CONCAT(d.first_name, ' ', d.last_name) AS doctor,
	DATE_FORMAT(a.admission_date, '%d/%m/%Y') AS admission_date
	FROM admission a
JOIN patient p ON a.patient_id = p.id
JOIN doctor d ON a.attending_doctor_id = d.id
WHERE p.allergies IS NOT NULL
ORDER BY a.admission_date ASC
LIMIT 5;

-- 2. Cantidad de admisiones por especialidad médica
SELECT 
    d.speciality, 
    COUNT(a.id) AS total_admissions
FROM admission a
JOIN doctor d ON a.attending_doctor_id = d.id
GROUP BY d.speciality
ORDER BY total_admissions DESC;

-- 3. Pacientes hospitalizados actualmente
SELECT 
    p.id AS patient_id, 
    p.first_name, 
    p.last_name, 
    a.admission_date, 
    d.first_name AS doctor_first_name, 
    d.last_name AS doctor_last_name
FROM admission a
JOIN patient p ON a.patient_id = p.id
JOIN doctor d ON a.attending_doctor_id = d.id
WHERE a.discharge_date IS NULL;

-- 4. Historial de admisiones de un paciente específico
SELECT 
    a.id AS admission_id, 
    a.admission_date, 
    a.discharge_date, 
    a.diagnosis, 
    d.first_name AS doctor_first_name, 
    d.last_name AS doctor_last_name
FROM admission a
JOIN doctor d ON a.attending_doctor_id = d.id
WHERE a.patient_id = 1
ORDER BY a.admission_date DESC;

-- 5. Índice de masa corporal (IMC) de los pacientes
SELECT 
    id AS patient_id, 
    first_name, 
    last_name, 
    weight, 
    height, 
    ROUND(weight / (POWER(height / 100.0, 2)), 2) AS bmi,
    CASE 
        WHEN ROUND(weight / (POWER(height / 100.0, 2)), 2) < 18.5 THEN 'Bajo peso'
        WHEN ROUND(weight / (POWER(height / 100.0, 2)), 2) BETWEEN 18.5 AND 24.9 THEN 'Normal'
        WHEN ROUND(weight / (POWER(height / 100.0, 2)), 2) BETWEEN 25 AND 29.9 THEN 'Sobrepeso'
        ELSE 'Obesidad'
    END AS bmi_category
FROM patient;