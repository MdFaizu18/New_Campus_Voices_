
import cloudinary from "../config/cloudinaryConfig.js";
import userModel from "../models/userModel.js"
import { comparePassword, hassPassword } from '../utils/passwordUtils.js';
// Example for Node.js/Express with JWT

export const getCurrentUser = async (req, res) => {
    if (!req.user) {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    try {
        const user = await userModel.findOne({ _id: req.user.userId });
        res.status(200).json({ user: user });

    } catch (error) {
        res.status(500).json({ msg: 'error in current user', error })
    }
}
export const updateUser = async (req, res) => {
    try {
        console.log("Update user function called");
        const { id } = req.params;
        const updates = req.body;

        console.log("Request file:", req.file);
        console.log("Request body:", req.body);

        // If there's a file uploaded, upload it to Cloudinary
        if (req.file) {
            console.log("File detected, attempting to upload to Cloudinary");
            try {
                // Convert buffer to base64 string
                const base64Image = `data:${req.file.mimetype
                    };base64,${req.file.buffer.toString("base64")}`;

                const result = await cloudinary.uploader.upload(base64Image, {
                    folder: "services",
                    resource_type: "auto",
                });
                console.log("Cloudinary upload result:", result);
                updates.profileImage = result.secure_url;
            } catch (cloudinaryError) {
                console.error("Cloudinary upload error:", cloudinaryError);
                return res.status(500).json({
                    msg: "Error uploading image to Cloudinary",
                    error: cloudinaryError.message,
                });
            }
        }

        console.log("Attempting to update user in database");
        const updatedUser = await userModel.findByIdAndUpdate(id, updates, {
            new: true,
        });

        if (!updatedUser) {
            console.log("User not found");
            return res.status(404).json({ msg: "User not found" });
        }
        console.log("User updated successfully");
        res.status(200).json({ msg: "User details modified...", updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ msg: "Error updating user", error: error.message });
    }
};


export const getUserRole = async (req, res) => {
    const { email: userEmail } = req.params;
    const user = await userModel.findOne({ email: userEmail });
    if (!user) {
        return res.status(404).json({ msg: `no user  with email ${userEmail} ` });
    }
    res.status(200).json({ user });
};
export const changePassword = async (req, res) => {
    const { oldPassword, newPassword, password } = req.body;

    console.log("Request body:", req.body); // Add this for debugging

    if (!oldPassword || !newPassword || !password) {
        return res
            .status(400)
            .json({ message: "Please provide all required password fields" });
    }

    try {
        // Retrieve user from database
        const user = await userModel.findOne({ _id: req.user.userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if old password matches
        const isMatch = await comparePassword(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        // Check if new password matches the confirmation
        if (newPassword !== password) {
            return res
                .status(400)
                .json({ message: "New password and confirm password do not match" });
        }

        // Hash the new password
        const hashedPassword = await hassPassword(newPassword);

        // Update user's password
        await userModel.updateOne(
            { _id: req.user.userId },
            { password: hashedPassword }
        );

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({
            message: "An error occurred while changing password",
            error: error.message,
        });
    }
};


export const getUserById = async (req, res) => {
    const { password, userId } = req.body;


    try {
        // Hash the new password
        const hashedPassword = await hassPassword(password);

        // Update the user's password in the database
        await userModel.findByIdAndUpdate(userId, { password: hashedPassword });

        res.status(200).json({ msg: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error updating password' });
    }
}