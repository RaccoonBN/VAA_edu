import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Sử dụng chuỗi kết nối của bạn với MongoDB Atlas
        const uri = 'mongodb+srv://nhom4:nhom4@cluster0.zmz8v.mongodb.net/vaaedu?retryWrites=true&w=majority';

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Thoát ứng dụng nếu không thể kết nối
    }
};

export default connectDB;
