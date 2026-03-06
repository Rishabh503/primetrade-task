import asyncHandler from '../utils/asyncHandler.util.js';
import ErrorResponse from '../utils/errorResponse.util.js';
import Note from '../models/note.model.js';

// @desc    Get all notes
// @route   GET /api/v1/notes
// @access  Private
export const getNotes = asyncHandler(async (req, res, next) => {
    let query;

    if (req.user.role === 'admin') {
        query = Note.find().populate('user', 'name email');
    } else {
        query = Note.find({ user: req.user.id });
    }

    const notes = await query;

    res.status(200).json({
        success: true,
        count: notes.length,
        data: notes
    });
});

// @desc    Get single note
// @route   GET /api/v1/notes/:id
// @access  Private
export const getNote = asyncHandler(async (req, res, next) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        return next(new ErrorResponse(`Note not found with id of ${req.params.id}`, 404));
    }


    if (note.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to view this note`, 401));
    }

    res.status(200).json({
        success: true,
        data: note
    });
});

// @desc    Create new note
// @route   POST /api/v1/notes
// @access  Private
export const createNote = asyncHandler(async (req, res, next) => {

    req.body.user = req.user.id;

    const note = await Note.create(req.body);

    res.status(201).json({
        success: true,
        data: note
    });
});

// @desc    Update note
// @route   PUT /api/v1/notes/:id
// @access  Private
export const updateNote = asyncHandler(async (req, res, next) => {
    let note = await Note.findById(req.params.id);

    if (!note) {
        return next(new ErrorResponse(`Note not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is note owner
    if (note.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this note`, 401));
    }

    note = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: note
    });
});

// @desc    Delete note
// @route   DELETE /api/v1/notes/:id
// @access  Private
export const deleteNote = asyncHandler(async (req, res, next) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        return next(new ErrorResponse(`Note not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is note owner
    if (note.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this note`, 401));
    }

    await note.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});
