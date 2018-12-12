const db = require("../database");
const stats = {
    setStats(callback) {
        db.query(
            "Insert Ignore into stats (id, subject_id, points, user_id) SELECT distinct quiz_instance.id, " +
                "category.subject_id, quiz.difficulty * 100 as points, quiz_instance.user_id as user_id FROM " +
                "group1.quiz_instance INNER JOIN quiz ON quiz_instance.quiz_id = quiz.id inner join " +
                "category on quiz.category_id = category.id WHERE quiz_instance.result=100;",
            callback
        );
    },
    getStats(callback) {
        db.query(
            "SELECT SUM(stats.points) as points, subject.name as subject, user.username as " +
                "username FROM group1.stats left join user on user.id = stats.user_id left join subject " +
                "on subject.id = stats.subject_id group by stats.subject_id, stats.user_id order by points DESC; ",
            callback
        );
    }
};
module.exports = stats;
