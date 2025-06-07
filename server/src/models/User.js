const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: false, trim: true },
  email: { type: String, required: true, unique: false, trim: true },
  password: { type: String, required: true },
  fullName: { type: String, trim: true },
}, {
  timestamps: true, // Автоматически добавляет createdAt и updatedAt
});

// Хеширование пароля перед сохранением
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

// Метод сравнения пароля
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
