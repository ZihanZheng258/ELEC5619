package com.elec5619.student.forum.pojos;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table
public class Notice {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "sender_id")
    private int senderID;

    @Column(name = "receiver_id")
    private int receiverID;

    @Column(name = "content")
    private String content;

    @Column(name = "create_date")
    private Date create_date;

    @Column(name = "have_read")
    private int have_read;
}
