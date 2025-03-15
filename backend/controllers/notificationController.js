import Notice from '../models/Notification.js';


export const getNotifications = async (req, res) => {
    try {
        const userId = req.user?.userId;
        
        if (!userId) {
            return res.status(401).json({ 
                status: false,
                message: 'User not authenticated' 
            });
        }

      
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');

      
        const notifications = await Notice.find({
            team: userId,
            isRead: { $ne: userId }
        })
        .sort('-createdAt')
        .populate('task', 'title priority date')
        .populate('team', 'name email')
        .lean();

        console.log('Fetched notifications for user:', userId, notifications);

        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ 
            status: false,
            message: error.message || 'Error fetching notifications'
        });
    }
};


export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const notification = await Notice.findById(id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        if (!notification.isRead.includes(userId)) {
            notification.isRead.push(userId);
            await notification.save();
        }

        res.json({ 
            status: true,
            message: 'Notification marked as read',
            notification 
        });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ 
            status: false,
            message: error.message || 'Error marking notification as read'
        });
    }
};


export const markAllAsRead = async (req, res) => {
    try {
        const notifications = await Notice.find({ 
            isRead: { $ne: req.user._id } 
        });

        for (const notification of notifications) {
            notification.isRead.push(req.user._id);
            await notification.save();
        }

        res.json({ message: 'All notifications marked as read' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const createNotification = async (data) => {
    try {
        const notification = new Notice(data);
        await notification.save();
        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
};