import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a product title'],
            trim: true,
            maxlength: [200, 'Title cannot be more than 200 characters'],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a product description'],
            maxlength: [2000, 'Description cannot be more than 2000 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide a price'],
            min: [0, 'Price cannot be negative'],
        },
        images: [
            {
                type: String,
                required: true,
            },
        ],
        category: {
            type: String,
            required: [true, 'Please provide a category'],
            enum: [
                'Electronics',
                'Clothing',
                'Books',
                'Home & Garden',
                'Sports',
                'Toys',
                'Beauty',
                'Food',
                'Other',
            ],
        },
        brand: {
            type: String,
            default: '',
        },
        stock: {
            type: Number,
            required: true,
            min: [0, 'Stock cannot be negative'],
            default: 0,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        reviews: [reviewSchema],
    },
    {
        timestamps: true,
    }
);

// Create text index for search functionality
productSchema.index({ title: 'text', description: 'text' });

// Auto-generate slug from title before saving
productSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }
    next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
