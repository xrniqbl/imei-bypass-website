-- ================================================
-- iUnlock.id - Seed Data
-- ================================================

-- Testimonials (sample data)
INSERT INTO testimonials (name, model_used, content, rating) VALUES
('Budi S.', 'iPhone X', 'Prosesnya cepat banget, kurang dari 3 jam langsung selesai. HP saya yang tadinya kena iCloud lock sekarang udah bisa dipake normal. Recommended!', 5),
('Rini A.', 'iPhone 11 Pro', 'Awalnya ragu-ragu tapi ternyata legit. CS-nya responsif, ngejelasin prosesnya dengan detail. iPhone 11 Pro saya udah unlocked sekarang. Makasih!', 5),
('Dimas P.', 'iPhone 13', 'Beli iPhone 13 second ternyata kena iCloud activation lock. Hubungi iUnlock, 6 jam kemudian sudah beres. Harganya juga sesuai budget. Top!', 5),
('Sinta W.', 'iPhone 8', 'Pelayanan profesional. Saya kirim IMEI, konfirmasi bayar via WA, 2 jam kemudian notif sudah selesai. Sangat memuaskan!', 5),
('Arif K.', 'iPhone 12 Pro Max', 'Sudah coba jasa lain sebelumnya tapi gagal. iUnlock berhasil bypass dalam 8 jam. Worth it banget untuk iPhone pro.', 4),
('Mega R.', 'iPhone SE (2nd Gen)', 'Cepat, murah, dan terpercaya! HP ibu saya yang kena lock sudah bisa dipakai lagi. Terima kasih iUnlock!', 5),
('Yoga H.', 'iPhone 14', 'Prosesnya transparan, bisa tracking status order kapan saja. Admin WA juga fast respon. Puas dengan hasilnya.', 5),
('Laras D.', 'iPhone 7 Plus', 'Awalnya skeptis karena harga murah, tapi ternyata kualitas premium. iPhone 7 Plus saya unlock dalam 2 jam saja.', 5),
('Fajar N.', 'iPhone 15 Pro', 'Jujur ekspektasinya 1-2 hari tapi ternyata selesai dalam 12 jam. Mantap! Langsung rekomendasikan ke teman-teman.', 5),
('Tari B.', 'iPhone XS Max', 'Komunikasinya lancar via WhatsApp. Proses pembayaran mudah, bukti kerja transparan. Pokoknya next time balik lagi ke sini!', 5);

-- Sample orders (for admin demo, status completed)
INSERT INTO orders (order_number, imei, model, service_type, status, customer_name, phone_wa, price, notes)
VALUES
('ORD2601140001', '356938035643809', 'iPhone 11', 'bypass', 'completed', 'Demo User 1', '6281234567890', 450000, 'Proses selesai normal'),
('ORD2601140002', '490154203237518', 'iPhone X', 'bypass', 'completed', 'Demo User 2', '6281234567891', 250000, 'Proses selesai normal'),
('ORD2601140003', '012345678901238', 'iPhone 13', 'unblock', 'processing', 'Demo User 3', '6281234567892', 500000, 'Sedang diproses oleh tim'),
('ORD2601140004', '123456789012345', 'iPhone 14 Pro', 'bypass', 'pending', 'Demo User 4', '6281234567893', 750000, NULL);
