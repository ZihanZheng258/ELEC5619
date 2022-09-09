package com.elec5619.student.forum.pojos;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table
public class Notice {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "content")
    private String content;

    @Column(name = "create_date")
    @CreatedDate
    private Date create_date;

    @Column(name = "have_read")
    private int have_read;

    @ManyToOne(targetEntity = User.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne(targetEntity = User.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id")
    private User receiver;
}
