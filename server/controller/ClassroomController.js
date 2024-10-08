import Classroom from "../model/Classroom.js";

// Utility function to generate a unique classroom code
const generateUniqueCode = (length = 6) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Create a classroom
// Define the createClassroom function
const createClassroom = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { classroom } = req.body;
    console.log(classroom);

    // Generate a unique code for the classroom
    const classroomCode = generateUniqueCode();

    const newClassroom = new Classroom({
      teacherId: classroom.teacherId, // Use the teacherId from the request
      classroomName: classroom.classroomName,
      teacherName: classroom.teacherName,
      code: classroomCode, // Use the generated code
      content: {
        videos: classroom.content.videos || [],
        notes: classroom.content.notes || [],
        announcements: classroom.content.announcements || [],
        syllabus: classroom.content.syllabus || [],
      },
    });

    // Save the classroom to the database
    const savedClassroom = await newClassroom.save();

    // Respond with the created classroom
    res.status(201).json({
      success: true,
      message: "Classroom created successfully!",
      classroom: savedClassroom,
    });
    console.log("Classroom created");
  } catch (error) {
    console.error("Error creating classroom:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create classroom",
      error: error.message,
    });
  }
};

// Get classrooms for a specific teacher
const getClassrooms = async (req, res) => {
  const { teacherId } = req.body;
  console.log(teacherId);
  try {
    const classrooms = await Classroom.find({ teacherId });

    res.status(200).json({ classrooms });
  } catch (error) {
    console.log("Error in fetching classroos ");
  }
};

// Add content to a classroom
const addContent = async (req, res) => {
  console.log(req.body);
  try {
    const { classroomId } = req.params;
    const { contentType, content, name } = req.body;

    const classroom = await Classroom.findById(classroomId);
    if (!classroom)
      return res
        .status(404)
        .json({ success: false, message: "Classroom not found" });

    classroom.content[contentType].push({
      content,
      name,
      timestamp: new Date(),
    });

    await classroom.save();

    res.status(200).json({
      success: true,
      message: "Content added successfully",
      classroom,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { createClassroom, getClassrooms, addContent };
