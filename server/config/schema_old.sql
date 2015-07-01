SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

--------------------------------------------------------
-- Schema classroom
--------------------------------------------------------
DROP SCHEMA IF EXISTS `classroom`;


CREATE SCHEMA IF NOT EXISTS `classroom` ;
USE `classroom` ;

-- -----------------------------------------------------
-- Table `classroom`.`users`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `classroom`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL ,
  `username` VARCHAR(20) NOT NULL ,
  `email` VARCHAR(100) NOT NULL ,
  `password` VARCHAR(100) NOT NULL ,
  `role` VARCHAR(20) NOT NULL DEFAULT 'student' ,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `classroom`.`lessons`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `classroom`.`lessons` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `title` VARCHAR(60) NOT NULL ,
  `description` VARCHAR(500) NOT NULL ,
  `content` TEXT NOT NULL ,
  `start_date` DATETIME NOT NULL ,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `classroom`.`grades`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `classroom`.`grades` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `lesson_title` VARCHAR(45) NOT NULL ,
  `student` VARCHAR(20) NOT NULL ,
  `score` INT NOT NULL ,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `classroom`.`attendance`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `classroom`.`attendance` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `date` VARCHAR(20) NOT NULL ,
  `student` VARCHAR(20) NOT NULL,
  `presence` TINYINT(1) NOT NULL ,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;

USE `classroom` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



-- -----------------------------------------------------
-- Data for table `lessons`
-- -----------------------------------------------------
START TRANSACTION;
USE `classroom`;
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Algorithms', 'Analysis of time and space complexity of algorithms', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue bibendum bibendum. Nullam fermentum tortor a nisl elementum condimentum. Nunc lorem felis, facilisis et est vulputate, iaculis posuere felis. Donec nec rutrum erat, vel rhoncus nunc. Aenean et molestie libero. Vivamus justo libero, lobortis quis nibh sed, tempor interdum magna. Vestibulum finibus, massa quis pulvinar consectetur, mauris mi mattis quam, ut imperdiet risus lorem maximus nibh. Phasellus fermentum purus at efficitur venenatis. Quisque congue id quam nec accumsan. Ut augue dolor, mattis at arcu sit amet, aliquet vehicula enim. Donec tortor lorem, ultricies nec varius et, egestas vitae quam.

Phasellus at dui ullamcorper, dignissim ex at, faucibus mauris. Aenean finibus facilisis arcu, nec malesuada nisi tristique vel. Praesent tempor dui vel risus sodales, eu aliquam justo dignissim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean sed augue aliquam, porta ex sed, cursus ligula. Donec molestie eget nisl id porta. Fusce nec ornare nisl, ut aliquam nulla. Nam venenatis varius sem vel tincidunt. Suspendisse convallis, nibh ac tempor consectetur, felis turpis mattis turpis, a vulputate dolor odio a ante. Maecenas finibus euismod mollis. Quisque tincidunt nulla sapien, viverra dapibus odio tristique sit amet.

Praesent sit amet lectus aliquam, accumsan lorem ut, molestie ex. Etiam malesuada vulputate mauris, ac maximus nisi congue vitae. Sed fermentum diam et ex ullamcorper, sit amet blandit nisl placerat. Vestibulum ullamcorper mauris eu leo vulputate ultrices. Morbi nulla tellus, fringilla quis sapien sit amet, auctor consectetur ipsum. Nam ut egestas arcu, sed pharetra magna. Nulla facilisi. Curabitur facilisis tincidunt turpis, at venenatis velit elementum sit amet. Suspendisse mollis lacus vitae fringilla sodales. Etiam at diam urna. Aenean enim tellus, sodales et ex et, venenatis pretium libero. Vivamus lorem quam, accumsan in euismod vel, fermentum vel lorem. Nullam porttitor efficitur massa, ac posuere ipsum.

Praesent eros tortor, luctus vel pretium vel, vehicula aliquam tortor. Integer felis nisi, eleifend rhoncus sodales at, varius a leo. Proin quam dui, posuere vel interdum id, elementum tincidunt ante. Aliquam vehicula fringilla tortor, consequat ultricies turpis pellentesque sit amet. Sed id neque ut tellus finibus interdum. In hendrerit lacus vitae mauris congue blandit. Sed viverra, leo eget aliquet auctor, justo velit dictum arcu, et posuere lacus risus et augue. Quisque lectus nunc, tincidunt fermentum enim ut, facilisis tempor dui. Suspendisse ultricies hendrerit diam id convallis.

Nam semper, orci non euismod suscipit, est massa congue mi, et ullamcorper lectus lectus sed mi. Nunc volutpat interdum aliquam. Vivamus ut nisl malesuada metus sodales vulputate vitae at metus. Nunc ipsum elit, aliquet eu vulputate vel, lacinia sit amet dui. Fusce in dapibus lectus, et eleifend elit. Cras eu eros ac dui luctus varius. Donec eu orci ut velit luctus dictum ac non dolor. Donec tincidunt ex nulla, id pellentesque tortor aliquam laoreet. Integer scelerisque mauris eros, in dictum nunc ultricies et. Phasellus est ligula, tempor sit amet dui fermentum, cursus fringilla odio. Pellentesque dolor mi, pretium sed rutrum ut, sagittis sit amet ipsum. Sed fermentum nisl quis convallis tempor. Maecenas nec suscipit mi, et cursus purus. Maecenas leo massa, ullamcorper eu commodo quis, sollicitudin quis nulla. Sed malesuada porta elit facilisis rhoncus. Donec ut felis dolor.', '2015-07-01', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Deep Neural Social Networking', 'More Analysis of time and space complexity of algorithms', 'Phasellus at dui ullamcorper, dignissim ex at, faucibus mauris. Aenean finibus facilisis arcu, nec malesuada nisi tristique vel. Praesent tempor dui vel risus sodales, eu aliquam justo dignissim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean sed augue aliquam, porta ex sed, cursus ligula. Donec molestie eget nisl id porta. Fusce nec ornare nisl, ut aliquam nulla. Nam venenatis varius sem vel tincidunt. Suspendisse convallis, nibh ac tempor consectetur, felis turpis mattis turpis, a vulputate dolor odio a ante. Maecenas finibus euismod mollis. Quisque tincidunt nulla sapien, viverra dapibus odio tristique sit amet.

Praesent sit amet lectus aliquam, accumsan lorem ut, molestie ex. Etiam malesuada vulputate mauris, ac maximus nisi congue vitae. Sed fermentum diam et ex ullamcorper, sit amet blandit nisl placerat. Vestibulum ullamcorper mauris eu leo vulputate ultrices. Morbi nulla tellus, fringilla quis sapien sit amet, auctor consectetur ipsum. Nam ut egestas arcu, sed pharetra magna. Nulla facilisi. Curabitur facilisis tincidunt turpis, at venenatis velit elementum sit amet. Suspendisse mollis lacus vitae fringilla sodales. Etiam at diam urna. Aenean enim tellus, sodales et ex et, venenatis pretium libero. Vivamus lorem quam, accumsan in euismod vel, fermentum vel lorem. Nullam porttitor efficitur massa, ac posuere ipsum.

Praesent eros tortor, luctus vel pretium vel, vehicula aliquam tortor. Integer felis nisi, eleifend rhoncus sodales at, varius a leo. Proin quam dui, posuere vel interdum id, elementum tincidunt ante. Aliquam vehicula fringilla tortor, consequat ultricies turpis pellentesque sit amet. Sed id neque ut tellus finibus interdum. In hendrerit lacus vitae mauris congue blandit. Sed viverra, leo eget aliquet auctor, justo velit dictum arcu, et posuere lacus risus et augue. Quisque lectus nunc, tincidunt fermentum enim ut, facilisis tempor dui. Suspendisse ultricies hendrerit diam id convallis.', '2015-07-01', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Sky Scrapers', 'Creation of various data structures.', 'Praesent sit amet lectus aliquam, accumsan lorem ut, molestie ex. Etiam malesuada vulputate mauris, ac maximus nisi congue vitae. Sed fermentum diam et ex ullamcorper, sit amet blandit nisl placerat. Vestibulum ullamcorper mauris eu leo vulputate ultrices. Morbi nulla tellus, fringilla quis sapien sit amet, auctor consectetur ipsum. Nam ut egestas arcu, sed pharetra magna. Nulla facilisi. Curabitur facilisis tincidunt turpis, at venenatis velit elementum sit amet. Suspendisse mollis lacus vitae fringilla sodales. Etiam at diam urna. Aenean enim tellus, sodales et ex et, venenatis pretium libero. Vivamus lorem quam, accumsan in euismod vel, fermentum vel lorem. Nullam porttitor efficitur massa, ac posuere ipsum.

Praesent eros tortor, luctus vel pretium vel, vehicula aliquam tortor. Integer felis nisi, eleifend rhoncus sodales at, varius a leo. Proin quam dui, posuere vel interdum id, elementum tincidunt ante. Aliquam vehicula fringilla tortor, consequat ultricies turpis pellentesque sit amet. Sed id neque ut tellus finibus interdum. In hendrerit lacus vitae mauris congue blandit. Sed viverra, leo eget aliquet auctor, justo velit dictum arcu, et posuere lacus risus et augue. Quisque lectus nunc, tincidunt fermentum enim ut, facilisis tempor dui. Suspendisse ultricies hendrerit diam id convallis.

Nam semper, orci non euismod suscipit, est massa congue mi, et ullamcorper lectus lectus sed mi. Nunc volutpat interdum aliquam. Vivamus ut nisl malesuada metus sodales vulputate vitae at metus. Nunc ipsum elit, aliquet eu vulputate vel, lacinia sit amet dui. Fusce in dapibus lectus, et eleifend elit. Cras eu eros ac dui luctus varius. Donec eu orci ut velit luctus dictum ac non dolor. Donec tincidunt ex nulla, id pellentesque tortor aliquam laoreet. Integer scelerisque mauris eros, in dictum nunc ultricies et. Phasellus est ligula, tempor sit amet dui fermentum, cursus fringilla odio. Pellentesque dolor mi, pretium sed rutrum ut, sagittis sit amet ipsum. Sed fermentum nisl quis convallis tempor. Maecenas nec suscipit mi, et cursus purus. Maecenas leo massa, ullamcorper eu commodo quis, sollicitudin quis nulla. Sed malesuada porta elit facilisis rhoncus. Donec ut felis dolor.', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Red Black Tree Sorts with Euler Curvaturation', 'Morbi id tincidunt magna. Praesent ut tortor quis risus mattis ullamcorper et in massa. Mauris', 'Donec vestibulum leo vitae ultricies molestie. Vivamus faucibus sit amet massa eleifend tincidunt. Donec ut condimentum elit. Maecenas magna eros, porta eget dolor sit amet, dictum aliquam sem. Sed interdum metus blandit pharetra tristique. Vestibulum at dui nunc. Nullam volutpat, ipsum sit amet aliquam convallis, felis ipsum posuere dolor, faucibus blandit augue velit sit amet diam. Donec nec hendrerit nunc. Praesent ut mauris maximus, suscipit odio id, tempor lacus. Donec a augue metus. In pellentesque purus ac leo interdum, id efficitur dolor pretium. Maecenas non leo ut sem mattis tristique. Nullam bibendum augue magna, at feugiat ante facilisis id.

Nunc nulla ex, elementum porttitor tempus vitae, pretium nec magna. Nullam congue tristique quam quis scelerisque. Maecenas porta volutpat feugiat. Donec vel ligula interdum, convallis metus in, malesuada turpis. Vivamus faucibus lorem ut fermentum consequat. Pellentesque non metus ac justo tempor ornare vitae sit amet felis. Aenean quis purus mi.

Ut non lorem eu dolor euismod pharetra ut in leo. Donec dignissim et nunc eu eleifend. Phasellus non luctus mi. Donec hendrerit id magna at rutrum. Quisque sit amet arcu ullamcorper, interdum odio sed, ullamcorper velit. Morbi pharetra lacus ac enim hendrerit consequat. Proin sed varius ante. Donec in arcu dapibus urna porttitor ultrices ac mollis nulla. Nam tincidunt ligula urna, vel sodales odio porttitor non. Etiam tristique tortor ut metus viverra fermentum.', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Primary Fourrier Transform Digests', 'In dignissim massa vitae metus imperdiet, eleifend fringilla ante aliquam', 'Aenean ullamcorper velit a tempus luctus. Nam sed elit dolor. Donec pharetra quam at finibus egestas. Aliquam libero est, fermentum quis purus et, iaculis mattis lectus. Morbi vestibulum porttitor sapien nec molestie. Donec enim nisl, semper eget libero sed, cursus efficitur lorem. Nunc luctus, lectus et ultricies bibendum, libero libero fringilla nisi, vel dignissim elit dui ac ligula. Donec condimentum semper mauris, at tincidunt felis fermentum non.

Donec vestibulum leo vitae ultricies molestie. Vivamus faucibus sit amet massa eleifend tincidunt. Donec ut condimentum elit. Maecenas magna eros, porta eget dolor sit amet, dictum aliquam sem. Sed interdum metus blandit pharetra tristique. Vestibulum at dui nunc. Nullam volutpat, ipsum sit amet aliquam convallis, felis ipsum posuere dolor, faucibus blandit augue velit sit amet diam. Donec nec hendrerit nunc. Praesent ut mauris maximus, suscipit odio id, tempor lacus. Donec a augue metus. In pellentesque purus ac leo interdum, id efficitur dolor pretium. Maecenas non leo ut sem mattis tristique. Nullam bibendum augue magna, at feugiat ante facilisis id.

Nunc nulla ex, elementum porttitor tempus vitae, pretium nec magna. Nullam congue tristique quam quis scelerisque. Maecenas porta volutpat feugiat. Donec vel ligula interdum, convallis metus in, malesuada turpis. Vivamus faucibus lorem ut fermentum consequat. Pellentesque non metus ac justo tempor ornare vitae sit amet felis. Aenean quis purus mi.

Ut non lorem eu dolor euismod pharetra ut in leo. Donec dignissim et nunc eu eleifend. Phasellus non luctus mi. Donec hendrerit id magna at rutrum. Quisque sit amet arcu ullamcorper, interdum odio sed, ullamcorper velit. Morbi pharetra lacus ac enim hendrerit consequat. Proin sed varius ante. Donec in arcu dapibus urna porttitor ultrices ac mollis nulla. Nam tincidunt ligula urna, vel sodales odio porttitor non. Etiam tristique tortor ut metus viverra fermentum.', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Reticent Extrapolation of Marginal Kelly Criterion', 'Nullam blandit laoreet dictum', 'Quisque vel lobortis risus, at tincidunt nibh. Integer nulla est, euismod ac pulvinar sit amet, commodo ac nisi. Aenean accumsan, turpis a commodo blandit, justo ligula dignissim enim, ut malesuada justo erat et nunc. Sed in nisl id ipsum pretium rhoncus in in elit. Pellentesque faucibus laoreet metus, eget rutrum ante mollis nec. Proin eget finibus orci, facilisis convallis ante. Ut hendrerit ipsum ut dolor aliquet eleifend. Sed at efficitur ante. Donec malesuada, est eget convallis porta, mauris ligula molestie tortor, id volutpat ipsum sem rutrum ligula. Duis fringilla ex a tortor condimentum, vel laoreet tellus venenatis. Vivamus ultricies at nibh ut dapibus. Sed libero mauris, tincidunt id tincidunt quis, fringilla quis nibh. Sed scelerisque sem nec quam blandit porttitor. Fusce eu cursus nisl.

Aliquam eget arcu id lacus bibendum tincidunt id sed justo. Praesent a dui eget tellus varius vulputate non vel lacus. Nam a neque pellentesque, placerat lectus eu, lobortis ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut sed tempus mauris. Aliquam erat volutpat. Donec mi nulla, vehicula non maximus et, finibus at tellus. Donec sed auctor arcu. Sed vehicula commodo volutpat.

Curabitur eu lorem at sapien faucibus iaculis. Quisque porttitor vestibulum fermentum. Donec euismod blandit scelerisque. Sed ac lobortis dolor. Pellentesque fringilla convallis dolor in laoreet. Sed sed diam lorem. Proin vel tellus nec arcu suscipit pulvinar. Quisque sagittis porttitor consequat. Aenean pharetra lectus ut magna ullamcorper, vel condimentum sapien efficitur. Nullam tristique luctus nisi quis eleifend. Nam in accumsan justo. Morbi at ultrices lorem. Donec eget ornare arcu.', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('John Nash and Mystery debate Game Theory', 'It is often tricky to identify "the best" of a certain category. But without a doubt, the Game Theory debate between John Nash and Mystery completely destroys the previous debate champion (The infamous Bohr-Einstein debates of the early twentieth century).',
  '<h1>John F Nash Jr.</h1>
  <img src="http://static01.nyt.com/images/2015/05/25/nyregion/25NASH4-obit/25NASH4-obit-master675.jpg">
  <br/>
  <p class="lead"><font size="6">
  He was best known for his advances in game theory, which is essentially the study of how to come up with a winning strategy in the game of life.
  </font></p>

  <h1>Mystery</h1>
  <img src="http://blog.vh1.com/files/2008/06/434x277.jpg">
  <br/>
  <p class="lead">
  He was best known for his advances in <b><i>\'game\'</i></b> theory, which is essentially the study of how to come up with baller pick-up lines and dress like a pimp swag boss master.
  </p>
  <p style="font-size: 150%;">
  The debate was leaning heavily in Mystery\'s favor until Richard Feynman showed up and invited John Nash to Crazy Horse. Mystery gave up his life of bling swag pimping to take remedial math at Greendale Community College.
  </p>', '2015-07-08', NULL, NULL);

INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Olfactory Analysis of the Tenderloin', 'Sed mollis, augue eget ullamcorper mattis', 'Sed at tortor sit amet mauris volutpat malesuada. Sed maximus, lorem non dictum venenatis, magna nisl dictum nisi, vel maximus sem sem nec nulla. Duis scelerisque, tellus a rutrum aliquet, mauris nulla tincidunt nulla, vitae placerat lacus augue non lacus. Duis vel nisi eget magna gravida dignissim eu ac enim. Sed laoreet sem porta nibh egestas, eget laoreet massa mollis. In a quam quis sem feugiat lobortis. Sed sed magna maximus, tincidunt leo a, tristique est. Quisque ipsum tortor, tincidunt vel est in, accumsan aliquet tortor. Donec fermentum turpis pellentesque, viverra nulla in, posuere lorem. Etiam venenatis sagittis quam. Etiam cursus ornare tortor, quis luctus dolor pharetra in.

Pellentesque tellus ante, tristique a eleifend vitae, porta vitae ante. Pellentesque vulputate nibh ut velit luctus molestie sed nec leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent a augue at turpis aliquet maximus sed eget diam. Etiam tempor nibh ut mi semper consectetur. Aenean pulvinar magna sed nulla bibendum fermentum. Proin tristique felis in aliquet egestas. Vivamus nisi magna, tincidunt vitae dui vel, suscipit tempor lorem. Duis vulputate elementum ex nec rutrum. Cras varius erat ligula, eu tristique nisi scelerisque vitae. Praesent lacinia id nulla vel dignissim. Nunc a gravida nulla. Ut eget lorem tincidunt, ultricies massa eu, mollis sapien. Vivamus ut nisl sit amet risus pretium porta. Morbi vulputate, lacus eget porttitor mollis, mi felis porttitor sapien, eget dignissim augue orci vel ligula. Vestibulum imperdiet ligula sit amet sagittis rutrum.

Quisque vel lobortis risus, at tincidunt nibh. Integer nulla est, euismod ac pulvinar sit amet, commodo ac nisi. Aenean accumsan, turpis a commodo blandit, justo ligula dignissim enim, ut malesuada justo erat et nunc. Sed in nisl id ipsum pretium rhoncus in in elit. Pellentesque faucibus laoreet metus, eget rutrum ante mollis nec. Proin eget finibus orci, facilisis convallis ante. Ut hendrerit ipsum ut dolor aliquet eleifend. Sed at efficitur ante. Donec malesuada, est eget convallis porta, mauris ligula molestie tortor, id volutpat ipsum sem rutrum ligula. Duis fringilla ex a tortor condimentum, vel laoreet tellus venenatis. Vivamus ultricies at nibh ut dapibus. Sed libero mauris, tincidunt id tincidunt quis, fringilla quis nibh. Sed scelerisque sem nec quam blandit porttitor. Fusce eu cursus nisl.', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('National Scheduling Conflict Championships', 'Cancelled', 'Cancelled...', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Lorem Data Entry 101', 'Phasellus ullamcorper nulla sit amet neque accumsan cursus', 'Suspendisse bibendum arcu et auctor maximus. Praesent vehicula quam ac ipsum scelerisque, eget ornare massa dictum. Nullam tincidunt mi ultrices nisi ornare dapibus. Suspendisse nec massa augue. Donec rutrum quam lorem. Cras sollicitudin mauris nec tortor pretium fermentum. Etiam vitae lorem vitae tortor facilisis iaculis nec quis velit. In finibus diam eu sapien commodo tempor. Cras consectetur est interdum leo viverra, in tempor sapien posuere. Praesent tempor commodo ex sed blandit.

Aliquam tincidunt nisi eros, nec accumsan elit bibendum vitae. Duis tempus a felis ac dignissim. Sed blandit efficitur dui, ac suscipit libero condimentum a. Curabitur imperdiet vel dui ullamcorper vestibulum. Phasellus ullamcorper nulla sit amet neque accumsan cursus. Vestibulum lorem nisi, sagittis at imperdiet nec, sodales consequat nulla. Praesent vel porta nunc. Ut volutpat magna lorem, et commodo elit dignissim eget. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras et malesuada lacus. Curabitur a sagittis felis, in euismod enim. Aliquam erat volutpat.

Nulla egestas massa volutpat finibus rhoncus. Sed mollis, augue eget ullamcorper mattis, velit felis venenatis magna, accumsan dignissim ex urna a lectus. Integer imperdiet leo sit amet felis commodo, sit amet tristique tortor lobortis. Pellentesque porttitor nisi sit amet ultricies semper. Nullam pharetra dui ligula, eu blandit eros consequat non. Vestibulum lobortis enim urna, vel ultrices arcu hendrerit nec. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam fringilla arcu et tincidunt cursus.', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Bohr\'s Enigma Net', 'liquam tincidunt nisi eros, nec accumsan elit bibendum', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Tarantino\'s Take On N-Queens', 'Praesent a dui eget tellus varius vulputate non vel lacus', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Lessons In Lorem', 'Sed in nisl id ipsum pretium rhoncus in in elit.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Cron. The Legend.', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Fredify Your Apps... Fredify Your Life!', 'Duis tempus a felis ac dignissim.', 'Curabitur eu lorem at sapien faucibus iaculis. Quisque porttitor vestibulum fermentum. Donec euismod blandit scelerisque. Sed ac lobortis dolor. Pellentesque fringilla convallis dolor in laoreet. Sed sed diam lorem. Proin vel tellus nec arcu suscipit pulvinar. Quisque sagittis porttitor consequat. Aenean pharetra lectus ut magna ullamcorper, vel condimentum sapien efficitur. Nullam tristique luctus nisi quis eleifend. Nam in accumsan justo. Morbi at ultrices lorem. Donec eget ornare arcu.

In dignissim massa vitae metus imperdiet, eleifend fringilla ante aliquam. Fusce facilisis odio tristique, molestie nisl et, egestas elit. Donec nec interdum felis. Ut sodales tellus quis tincidunt consequat. Donec eget diam et mi placerat tincidunt. Vestibulum eleifend vulputate mi, sit amet commodo magna vestibulum sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet nisi augue, eu mollis eros placerat sit amet. Pellentesque bibendum volutpat mollis. Aenean odio nibh, malesuada ut nisi et, vestibulum porta felis.

Aenean et mauris nisi. Phasellus in velit quis quam congue sagittis et sit amet tortor. Suspendisse mollis nulla ligula, ut convallis diam pellentesque at. Sed posuere ipsum diam, nec pellentesque diam gravida sed. Nunc porta ullamcorper turpis, non interdum ex sollicitudin vitae. Proin iaculis nunc quis mauris dictum, eget cursus turpis porttitor. Pellentesque consectetur sapien quis sem vehicula, vitae ultricies elit ultricies. Nam vitae enim ante. Praesent consectetur turpis nec fringilla placerat.

Curabitur ut ultricies metus. Nullam blandit laoreet dictum. Sed molestie ex et maximus ultricies. Integer blandit mattis arcu. Donec orci erat, commodo at mattis at, hendrerit eget tortor. Integer vehicula nisi ut erat eleifend, ut aliquet magna viverra. Donec euismod est sit amet ex tincidunt, at elementum quam vehicula. Nam dui diam, lobortis et nisl sit amet, faucibus egestas massa.

Suspendisse bibendum arcu et auctor maximus. Praesent vehicula quam ac ipsum scelerisque, eget ornare massa dictum. Nullam tincidunt mi ultrices nisi ornare dapibus. Suspendisse nec massa augue. Donec rutrum quam lorem. Cras sollicitudin mauris nec tortor pretium fermentum. Etiam vitae lorem vitae tortor facilisis iaculis nec quis velit. In finibus diam eu sapien commodo tempor. Cras consectetur est interdum leo viverra, in tempor sapien posuere. Praesent tempor commodo ex sed blandit.

', '2015-07-08', NULL, NULL);

COMMIT;

-- -----------------------------------------------------
-- Data for table `grades`
-- -----------------------------------------------------
START TRANSACTION;
USE `classroom`;
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Algorithms', 'devon', '60');
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Data Structures', 'devon', '55');
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Algorithms2', 'devon', '45');
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Data Structures2', 'devon', '32');
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Algorithms', 'richard', '100');
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Data Structures', 'richard', '98');
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Algorithms2', 'richard', '87');
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Data Structures', 'richard', '76');
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Algorithms', 'eric', '100');
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Data Structures', 'eric', '99');
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Algorithms2', 'eric', '100');
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Data Structures', 'eric', '98');

COMMIT;


-- -----------------------------------------------------
-- Data for table `attendance`
-- -----------------------------------------------------
START TRANSACTION;
USE `classroom`;
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-01', 'devon', '1');
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-02', 'devon', '0');
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-03', 'devon', '1');
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-04', 'devon', '1');
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-01', 'richard', '1');
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-02', 'richard', '1');
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-03', 'richard', '0');
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-04', 'richard', '1');
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-04', 'eric', '1');
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-04', 'eric', '1');
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-04', 'eric', '1');
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-04', 'eric', '1');


COMMIT;

-- -----------------------------------------------------
-- Data for table `users`
-- -----------------------------------------------------
START TRANSACTION;
USE `classroom`;
INSERT INTO `users` (`name`, `username`, `email`, `password`, `role`) VALUES ('Devon Harvey', 'devon', 'devon@a.com', '$2a$05$cf.yjZq7w8.J0xqTph5GuODea5/6NywitFojEtJIT5gaXv3kFrvfC', 'student');
INSERT INTO `users` (`name`, `username`, `email`, `password`, `role`) VALUES ('Richard Stanley', 'richard', 'richard@a.com', '$2a$05$cf.yjZq7w8.J0xqTph5GuODea5/6NywitFojEtJIT5gaXv3kFrvfC', 'student');
INSERT INTO `users` (`name`, `username`, `email`, `password`, `role`) VALUES ('Jake Lee', 'jake', 'jake@a.com', '$2a$05$cf.yjZq7w8.J0xqTph5GuODea5/6NywitFojEtJIT5gaXv3kFrvfC', 'teacher');
INSERT INTO `users` (`name`, `username`, `email`, `password`, `role`) VALUES ('Eric Ihli', 'eric', 'Eric@a.com', '$2a$05$cf.yjZq7w8.J0xqTph5GuODea5/6NywitFojEtJIT5gaXv3kFrvfC', 'student');


COMMIT;
